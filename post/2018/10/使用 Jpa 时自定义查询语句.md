---
title: use jpa in springboot custom query sql
modify: 2018-10-10 08:00:00
tags: 
 - jpa
---



在 Spring Data JPA 中，Dao 文件只需要继承  JpaRepository  就可以实现增删改查，但实际应用中，查询 sql 是很复杂的，简单的通过id查询并不能满足业务需求。有几种方式可以自定义查询语句。

<!-- more -->

# 1、按规则命名方法

在 Dao 中按约定定义方法名，jpa 会自动根据方法名生成 sql 语句，比如想根据姓名查询满足条件的学生列表，可以按以下这么定义：



```java
public interface TestStudentRepository extends JpaRepository<TestStudent, Integer> {
    public List<TestStudent> findByName(String name);
}
```



findByName其实是findByNameEquals的省略，具体的规则可以见下表：

| 关键字            | 方法命名                       | sql where字句              |
| ----------------- | ------------------------------ | -------------------------- |
| And               | findByNameAndPwd               | where name= ? and pwd =?   |
| Or                | findByNameOrSex                | where name= ? or sex=?     |
| Is,Equals         | findById,findByIdEquals        | where id= ?                |
| Between           | findByIdBetween                | where id between ? and ?   |
| LessThan          | findByIdLessThan               | where id < ?               |
| LessThanEquals    | findByIdLessThanEquals         | where id <= ?              |
| GreaterThan       | findByIdGreaterThan            | where id > ?               |
| GreaterThanEquals | findByIdGreaterThanEquals      | where id > = ?             |
| After             | findByIdAfter                  | where id > ?               |
| Before            | findByIdBefore                 | where id < ?               |
| IsNull            | findByNameIsNull               | where name is null         |
| isNotNull,NotNull | findByNameNotNull              | where name is not null     |
| Like              | findByNameLike                 | where name like ?          |
| NotLike           | findByNameNotLike              | where name not like ?      |
| StartingWith      | findByNameStartingWith         | where name like '?%'       |
| EndingWith        | findByNameEndingWith           | where name like '%?'       |
| Containing        | findByNameContaining           | where name like '%?%'      |
| OrderBy           | findByIdOrderByXDesc           | where id=? order by x desc |
| Not               | findByNameNot                  | where name <> ?            |
| In                | findByIdIn(Collection<?> c)    | where id in (?)            |
| NotIn             | findByIdNotIn(Collection<?> c) | where id not  in (?)       |
| True              | findByAaaTue                   | where aaa = true           |
| False             | findByAaaFalse                 | where aaa = false          |
| IgnoreCase        | findByNameIgnoreCase           | where UPPER(name)=UPPER(?) |



# 2、通过注解 @Query 来自定义 SQL

@query中的语句并不像mybatis就是原生的sql，是 JPQL，可以 [参考文档](https://www.baeldung.com/spring-data-jpa-query)。示例如下，第一个参数写为 ?1，以此类推。当涉及到 insert、update 和 delete 时，需要增加 @Modifying 注解

```java
public interface TestStudentRepository extends JpaRepository<TestStudent, Integer> {

    @Query("select s from TestStudent s where s.name = ?1 and s.gender = ?2 ")
    List<TestStudent> findByCondition(String name, int gender);


    @Query("DELETE FROM TestStudent s WHERE s.name = ?1")
    @Modifying
    void deleteByName(String name);
}
```



在mybatis中可以使用OGNL来实现动态sql的拼接，功能特别强大，如：

```java
select * from user where 1=1
<if test="name != null">
    name = #{name}
</if>
```

在jpa中，类似的操作只找到一个类似三目运算符的，如下：

```java
@Query(value="select u.* from user u where if(?1 == null, 1=1, name = ?1)", nativeQuery = true)
List<User> findByCondition(String userName);
```



# 3、通过继承 JpaSpecificationExecutor 来实现更复杂的查询逻辑

实际应用中查询可能更复杂，想要动态拼接sql，就需要先继承 JpaSpecificationExecutor 了，Dao 定义如下：

```java
public interface TestStudentRepository extends JpaSpecificationExecutor<TestStudent> {
}
```



JpaSpecificationExecutor 定义了5个方法，只需要实现 Specification 接口，就可以完成查询条件的自定义。

```java
public interface JpaSpecificationExecutor<T> {
    Optional<T> findOne(@Nullable Specification<T> var1);

    List<T> findAll(@Nullable Specification<T> var1);

    Page<T> findAll(@Nullable Specification<T> var1, Pageable var2);

    List<T> findAll(@Nullable Specification<T> var1, Sort var2);

    long count(@Nullable Specification<T> var1);
}
```



测试用例：

```java
@Test
public void testJPA(){
    Map<String, Object> filter = new HashMap<>();
    filter.put("name", "小明");
    filter.put("gender", 1);

    List<TestStudent> list = testStudentRepository.findAll(new Specification<TestStudent>() {
        @Override
        public Predicate toPredicate(Root<TestStudent> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder builder) {
            Predicate predicate = builder.conjunction();    // and连接
            List<Expression<Boolean>> expr = predicate.getExpressions();

            if (filter == null) {
                return predicate;
            }

            // 姓名不为空时，按姓名查询
            if (filter.get("name") != null) {
                expr.add(
                    builder.equal(root.get("name").as(String.class), 
                    filter.get("name"))
                );
            }

            // 年龄不为空时，按年龄查询
            if (filter.get("gender") != null) {
                expr.add(
                    builder.equal(root.get("gender").as(Integer.class),
                    filter.get("gender"))
                );
            }

            return predicate;
        }
    });

}
```