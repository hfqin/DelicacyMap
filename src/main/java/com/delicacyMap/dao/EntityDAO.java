package com.delicacyMap.dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate4.HibernateCallback;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


/**
 * 
 * 
 * @version 1.0
 * @param <T>
 *            范型，指实体类
 * @param <PK>
 *            范型，指实体类主键的数据类型，如Integer,Long
 * @see dream.dao.EntityDAO
 */
@SuppressWarnings({ "rawtypes", "unchecked" })
@Repository
@Transactional
public class EntityDAO<T, PK extends Serializable> extends HibernateDaoSupport {

	
	@Resource
	public void setSessionFactoryForAnnotation(SessionFactory sessionFactory){  
		super.setSessionFactory(sessionFactory);  
	}
	
	/**
	 * 保存实体
	 * 
	 * @param t
	 *            实体对象
	 */
	public void save(T t) {
		getHibernateTemplate().save(t);
	}

	/**
	 * 更新实体
	 * 
	 * @param t
	 *            实体对象
	 */
	public void update(T t) {
		getHibernateTemplate().update(t);
	}

	/**
	 * 保存实体 包括添加和修改
	 * 
	 * @param t
	 *            实体对象
	 */
	public void saveOrUpdate(T t) {
		getHibernateTemplate().merge(t);
	}

	/**
	 * 更新实体 可用于添加、修改、删除操作
	 * 
	 * @param hql
	 *            更新的HQL语句
	 * @param params
	 *            参数,可有项目或多项目,代替Hql中的"?"号
	 */
	public void excute(final String hql, final List params) {
		HibernateCallback hibernateCallback = new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException {
				Query query = session.createQuery(hql);
				for (int i = 0; i < params.size(); i++) {
					query.setParameter(i, params.get(i));
				}
				query.executeUpdate();
				return null;
			}
		};
		getHibernateTemplate().execute(hibernateCallback);
	}

	/**
	 * 删除实体
	 * 
	 * @param t
	 *            实体对象
	 */
	public void delete(T t) {
		getHibernateTemplate().delete(t);
	}

	public void deleteByCriteria(Class<T> entityClass, final List<Criterion> criterions) {
		// TODO Auto-generated method stub
		getHibernateTemplate().deleteAll(findByCriteria(entityClass, null, true, 0, 0, criterions));
	}

	/**
	 * 删除实体
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param id
	 *            实体的ID
	 */
	public void delete(Class<T> entityClass, PK id) {
		getHibernateTemplate().delete(get(entityClass, id));
	}

	/**
	 * 单查实体
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param id
	 *            实体的ID
	 * @return 实体对象
	 */

	public T get(Class<T> entityClass, PK id) {
		return (T) getHibernateTemplate().get(entityClass, id);
	}

	/**
	 * 查询全部记录列表
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param propertyName
	 *            排序的参照属性
	 * @param isAsc
	 *            排序方式
	 * @param criterions
	 *            查询条件,可为0项或任意多项目
	 * @return 记录List集
	 */
	public List<T> findAll(final Class<T> entityClass,
			final String propertyName, final boolean isAsc,
			final List<Criterion> criterions) {
		int firstResult = 0;
		int maxResults = 0; // 设置为0,则表示查询全部记录
		return findByCriteria(entityClass, propertyName, isAsc, firstResult,
				maxResults, criterions);
	}

	/**
	 * 查询列表
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param propertyName
	 *            排序的参照属性
	 * @param isAsc
	 *            排序方式,true表示升序,false表示降序,当propertyName赋值为null时,此参数无效
	 * @param firstResult
	 *            开始记录序号
	 * @param maxResults
	 *            最大记录数
	 * @param criterions
	 *            查询条件,可有0项或任意多项目
	 * @return 记录List集
	 */

	public List<T> findByCriteria(final Class<T> entityClass,
			final String propertyName, final boolean isAsc,
			final int firstResult, final int maxResults,
			final List<Criterion> criterions) {
		List<T> list = (List<T>) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException {
						Criteria criteria = session.createCriteria(entityClass);
						// 按属性条件查询
						for (int i = 0; i < criterions.size(); i++) {
							criteria.add(criterions.get(i));
						}
						// 按某个属性排序
						if (null != propertyName) {
							if (isAsc) {
								criteria.addOrder(Order.asc(propertyName));
							} else {
								criteria.addOrder(Order.desc(propertyName));
							}
						}
						// 用于分页查询
						if (maxResults != 0) {
							criteria.setFirstResult(firstResult);
							criteria.setMaxResults(maxResults);
						}
						List<T> list = criteria.list();
						return list;
					}
				});
		return list;
	}

	public List<T> findByCriteria(final Class<T> entityClass,
			final String propertyName, final boolean isAsc,
			final int firstResult, final int maxResults,
			final List<Criterion> criterions,
			final Map<String, String> alias) {
		List<T> list = (List<T>) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException {
						Criteria criteria = session.createCriteria(entityClass);
						// 按属性条件查询
						for (int i = 0; i < criterions.size(); i++) {
							criteria.add(criterions.get(i));
						}
						Set<String> keys = alias.keySet();
						for (String key : keys) {
							criteria.createAlias(key, alias.get(key));
						}
						// 按某个属性排序
						if (null != propertyName) {
							if (isAsc) {
								criteria.addOrder(Order.asc(propertyName));
							} else {
								criteria.addOrder(Order.desc(propertyName));
							}
						}
						// 用于分页查询
						if (maxResults != 0) {
							criteria.setFirstResult(firstResult);
							criteria.setMaxResults(maxResults);
						}
						List<T> list = criteria.list();
						return list;
					}
				});
		return list;
	}
	/**
	 * 查询总记录数
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param criterions
	 *            查询条件,可有0项或任意多项
	 * @return 总记录数
	 */

	public int findCountsByCriteria(final Class<T> entityClass,
			final List<Criterion> criterions) {
		int totalCounts = (Integer) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException {
						Criteria criteria = session.createCriteria(entityClass);
						// 按属性条件查询
						for (int i = 0; i < criterions.size(); i++) {
							criteria.add(criterions.get(i));
						}
						int totalCounts = ((Number) criteria.setProjection(
								Projections.rowCount()).uniqueResult())
								.intValue();
						return totalCounts;
					}
				});
		return totalCounts;
	}

	/**
	 * 分页查询
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param propertyName
	 *            排序参照属性
	 * @param isAsc
	 *            排序方式,true表示升序,false表示降序,当propertyName赋值为null时,此参数无效
	 * @param firstResult
	 *            开始记录序号
	 * @param maxResults
	 *            最大记录数
	 * @param criterions
	 *            查询条件,可为0项或任意多项目
	 * @return 封装List和totalCounts的Pager对象
	 */
	/*
	 * public Pager<T> findForPager(final Class<T> entityClass, final String
	 * propertyName, final boolean isAsc, final int firstResult, final int
	 * maxResults, final Criterion criterions) { int totalCounts =
	 * findCountsByCriteria(entityClass, criterions); List<T> entityList =
	 * findByCriteria(entityClass, propertyName, isAsc, firstResult, maxResults,
	 * criterions); Pager pager = new Pager();
	 * pager.setTotalCounts(totalCounts); pager.setEntityList(entityList);
	 * return pager; }
	 */

	/**
	 * 根据属性值查询列表
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param propertyName
	 *            属性名
	 * @param value
	 *            属性值
	 * @return List列表
	 */
	public List<T> findByProperty(Class<T> entityClass, String propertyName,
			Object value) {
		List<Criterion> criterions = new ArrayList<Criterion>();
		Criterion criterion = Restrictions.eq(propertyName, value);
		criterions.add(criterion);
		List<T> list = findAll(entityClass, null, true, criterions);
		return list;
	}

	/**
	 * 根据属性值列表查询列表
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param properties
	 *            属性表
	 * @return List列表
	 */
	public List<T> findByProperties(final Class<T> entityClass,
			final Map<String, Object> properties) {
		List<T> list = (List<T>) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException {
						Set<String> keys = properties.keySet();
						Criteria criteria = session.createCriteria(entityClass);
						Iterator<String> iter = keys.iterator();
						while (iter.hasNext()) {
							String key = iter.next();
							Criterion criterion = Restrictions.eq(key,
									properties.get(key));
							criteria.add(criterion);
						}
						List<T> list = criteria.list();
						return list;
					}
				});
		return list;
	}

	/**
	 * 根据属性值查询单个对象
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param propertyName
	 *            属性名
	 * @param value
	 *            属性值
	 * @return 实体对象
	 */

	public T findUniqueByProperty(final Class<T> entityClass,
			final String propertyName, final Object value) {
		T t = (T) getHibernateTemplate().execute(new HibernateCallback() {

			public Object doInHibernate(Session session)
					throws HibernateException {
				Criteria criteria = session.createCriteria(entityClass).add(
						Restrictions.eq(propertyName, value));
				T t = (T) criteria.uniqueResult();
				return t;
			}
		});
		return t;
	}

	/**
	 * 根据属性值列表查询单个对象
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param properties
	 *            属性表
	 * @return 实体对象
	 */

	public T findUniqueByProperties(final Class<T> entityClass,
			final Map<String, Object> properties) {
		T t = (T) getHibernateTemplate().execute(new HibernateCallback() {

			public Object doInHibernate(Session session)
					throws HibernateException {
				Set<String> keys = properties.keySet();
				Criteria criteria = session.createCriteria(entityClass);
				Iterator<String> iter = keys.iterator();
				while (iter.hasNext()) {
					String key = iter.next();
					Criterion criterion = Restrictions.eq(key,
							properties.get(key));
					criteria.add(criterion);
				}
				T t = (T) criteria.uniqueResult();
				return t;
			}
		});
		return t;
	}

	public T findUniqueByProperties(final Class<T> entityClass,
			final Map<String, Object> properties,
			final Map<String, String> alias) {
		T t = (T) getHibernateTemplate().execute(new HibernateCallback() {

			public Object doInHibernate(Session session)
					throws HibernateException {
				Set<String> keys = properties.keySet();
				Set<String> aliasKeys = alias.keySet();
				Criteria criteria = session.createCriteria(entityClass);
				for (String key : aliasKeys) {
					criteria.createAlias(key, alias.get(key));
				}
				Iterator<String> iter = keys.iterator();
				while (iter.hasNext()) {
					String key = iter.next();
					Criterion criterion = Restrictions.eq(key,
							properties.get(key));
					criteria.add(criterion);
				}
				T t = (T) criteria.uniqueResult();
				return t;
			}
		});
		return t;
	}

	
	/**
	 * 根据属性值查询实体是否存在
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param properties
	 *            属性表
	 * @return 存在则返回true,不存在则返回false
	 */

	public boolean isPropertiesExist(final Class<T> entityClass,
			final Map<String, Object> properties) {
		boolean isExist = (Boolean) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException {
						Set<String> keys = properties.keySet();
						Criteria criteria = session.createCriteria(entityClass);
						Iterator<String> iter = keys.iterator();
						while (iter.hasNext()) {
							String key = iter.next();
							Criterion criterion = Restrictions.eq(key,
									properties.get(key));
							criteria.add(criterion);
						}
						boolean isEmpty = criteria.list().isEmpty();
						return !isEmpty;
					}
				});
		return isExist;
	}

	/**
	 * 根据属性值查询实体是否存在，要求所有属性值都存在
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param properties
	 *            属性表
	 * @return 存在则返回true,不存在则返回false
	 */

	public boolean isAllPropertiesExist(final Class<T> entityClass,
			final Map<String, Object> properties) {
		boolean isExist = (Boolean) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException {
						Set<String> keys = properties.keySet();
						Criteria criteria = session.createCriteria(entityClass);
						Iterator<String> iter = keys.iterator();
						Conjunction conjunction = Restrictions.conjunction();
						while (iter.hasNext()) {
							String key = iter.next();
							Criterion criterion = Restrictions.eq(key,
									properties.get(key));
							conjunction.add(criterion);
						}
						criteria.add(conjunction);
						criteria.list();
						boolean isEmpty = criteria.list().isEmpty();
						return !isEmpty;
					}
				});
		return isExist;
	}
	
	public boolean isAllPropertiesExist(final Class<T> entityClass,
			final Map<String, Object> properties,
			final Map<String, String> alias) {
		boolean isExist = (Boolean) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException {
						Set<String> keys = properties.keySet();
						Set<String> aliasKeys = alias.keySet();
						Criteria criteria = session.createCriteria(entityClass);
						for (String key : aliasKeys) {
							criteria.createAlias(key, alias.get(key));
						}
						Iterator<String> iter = keys.iterator();
						Conjunction conjunction = Restrictions.conjunction();
						while (iter.hasNext()) {
							String key = iter.next();
							Criterion criterion = Restrictions.eq(key,
									properties.get(key));
							conjunction.add(criterion);
						}
						criteria.add(conjunction);
						criteria.list();
						boolean isEmpty = criteria.list().isEmpty();
						return !isEmpty;
					}
				});
		return isExist;
	}
	
	/**
	 * 根据属性值列表查询实体是否存在
	 * 
	 * @param entityClass
	 *            实体类名
	 * @param propertyName
	 *            参照的属性名
	 * @param value
	 *            属性值
	 * @return 存在则返回true,不存在则返回false
	 */

	public boolean isPropertyExist(final Class<T> entityClass,
			final String propertyName, final Object value) {
		boolean isExist = (Boolean) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException {
						Criteria criteria = session.createCriteria(entityClass)
								.add(Restrictions.eq(propertyName, value));
						boolean isEmpty = criteria.list().isEmpty();
						return !isEmpty;
					}
				});
		return isExist;
	}

	/**
	 * 
	 * @param hql
	 *            查询语句 用法如：可用于登录验证时，根据用户名、密码等信息查询用户
	 * @param params
	 *            参数数组,代替HQL中的"?"号,可有0项目或多项
	 * @return 唯一实体，返回null则表示不存在配置的实体
	 * @exception 如果查询的结果集不唯一
	 *                ,则抛异常
	 */

	public T findUniqueByHql(final String hql, final List params) {

		T t = (T) getHibernateTemplate().execute(new HibernateCallback() {

			public Object doInHibernate(Session session)
					throws HibernateException {
				Query query = session.createQuery(hql);
				for (int i = 0; i < params.size(); i++) {
					query.setParameter(i, params.get(i));
				}
				T t = (T) query.uniqueResult();
				return t;
			}
		});
		return t;
	}

	/**
	 * 按HQL条件查询列表
	 * 
	 * @param hql
	 *            查询语句,支持连接查询和多条件查询
	 * @param params
	 *            参数数组,代替hql中的"?"号
	 * @return 结果集List
	 */

	public List<T> findByHql(final String hql, final List params) {

		List<T> list = (List)getHibernateTemplate().execute(new HibernateCallback() {

			public Object doInHibernate(Session session)
					throws HibernateException {
				Query query = session.createQuery(hql);
				for (int i = 0; i < params.size(); i++) {
					query.setParameter(i, params.get(i));
				}
				List<T> list = (List<T>) query.list();
				return list;
			}
		});
		return list;
	}

	public List<T> findByHql(final String hql, final Integer max,
			final List params) {
		List<T> list = (List)getHibernateTemplate().execute(new HibernateCallback() {

			public Object doInHibernate(Session session)
					throws HibernateException {
				Query query = session.createQuery(hql);
				for (int i = 0; i < params.size(); i++) {
					query.setParameter(i, params.get(i));
				}

				if (max != 0) {
					query.setMaxResults(max);
				}
				List<T> list = (List<T>) query.list();
				return list;
			}
		});
		return list;
	}
	
	public List<T> findBySql(final String sql){
		List<T> list = (List<T>) getHibernateTemplate().execute(new HibernateCallback<List>() {

			public List doInHibernate(Session session) throws HibernateException {
				SQLQuery sqlQuery = session.createSQLQuery(sql);
				sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				return sqlQuery.list();
			}
		});
		return list;
	}

	/**
	 * 按HQL查询列表
	 * 
	 * @param hql
	 *            查询语句
	 * @return 结果集List
	 */

	public List<T> findByHql(final String hql) {
		List<T> list = (List)getHibernateTemplate().execute(new HibernateCallback() {

			public Object doInHibernate(Session session)
					throws HibernateException {
				Query query = session.createQuery(hql);

				List<T> list = (List<T>) query.list();
				return list;
			}
		});
		return list;
	}

	/**
	 * 按HQL查询列表，列表条目数有最大值
	 * 
	 * @param hql
	 *            查询语句
	 * @param max
	 *            最大值
	 * @return 结果集List
	 */
	public List<T> findByHql(final String hql, final Integer max) {
		List<T> list = (List)getHibernateTemplate().execute(new HibernateCallback() {

			public Object doInHibernate(Session session)
					throws HibernateException {
				Query query = session.createQuery(hql);

				if (max != 0) {
					query.setMaxResults(max);
				}
				List<T> list = (List<T>) query.list();
				return list;
			}
		});
		return list;
	}

	/**
	 * 按HQL分页查询
	 * 
	 * @param firstResult
	 *            开始记录号
	 * @param maxResults
	 *            最大记录数
	 * @param hql
	 *            查询语句,支持连接查询和多条件查询
	 * @param params
	 *            参数数组,代替餐hql中的"?"号
	 * @return 封装List和total的Pager对象
	 */
	/*
	 * public Pager<T> findForPagerByHql(final int firstResult, final int
	 * maxResults, final String hql, final Object params) { Pager<T> pager =
	 * (Pager<T>) getHibernateTemplate().execute( new HibernateCallback() {
	 * 
	 * public Object doInHibernate(Session session) throws HibernateException,
	 * SQLException { Query query = session.createQuery(hql); for (int position
	 * = 0; position < params.length; position++) { query.setParameter(position,
	 * params[position]); } int totalCounts = query.list().size(); // 总记录数 //
	 * 用于分页查询 if (maxResults > 0) { query.setFirstResult(firstResult);
	 * query.setMaxResults(maxResults); } List<T> list = query.list(); Pager<T>
	 * pager = new Pager<T>(); pager.setEntityList(list);
	 * pager.setTotalCounts(totalCounts); return pager; } }); return pager; }
	 */

}