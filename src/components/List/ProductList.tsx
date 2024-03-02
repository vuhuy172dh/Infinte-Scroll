import { useInfiniteQuery } from '@tanstack/react-query';
import { List, Skeleton } from 'antd';
import { FC, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductCard, ProductProps } from '../Card/index.ts';
import styles from './ProductList.module.css';

export type DataProps = {
  skip: number;
  total: number;
  limit: number;
  products: ProductProps[];
};

const PRODUCTS_LIMIT = 20;
const InfiniteComponent = InfiniteScroll as any as FC<InfiniteScroll.Props>;

const ProductList = ({ search }: { search?: string }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  // NOTE: change API when having 'search' props
  const baseUrl = useMemo(() => {
    if (search) return `https://dummyjson.com/products/search?q=${search}&`;
    else return 'https://dummyjson.com/products?';
  }, [search]);

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery<DataProps>({
      queryKey: ['PRODUCTS', search],
      queryFn: ({ pageParam }) =>
        fetch(
          `${baseUrl}limit=${PRODUCTS_LIMIT}&skip=${pageParam}&select=id,title,description,price,images`,
        ).then((res) => res.json()),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.skip + lastPage.limit === lastPage.total) return null;
        return lastPage.skip + lastPage.limit;
      },
    });

  useEffect(() => {
    const newProducts: ProductProps[] = [];

    data?.pages.forEach((page) => newProducts.push(...page.products));
    setProducts(newProducts);
  }, [data?.pages.length, search]);

  return (
    <div className={styles.productList}>
      {isLoading ? (
        <Skeleton avatar paragraph={{ rows: 1 }} active />
      ) : (
        <InfiniteComponent
          dataLength={products.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<p>It is all, nothing more</p>}
        >
          <List
            dataSource={products}
            renderItem={(item) => <ProductCard key={item.id} {...item} />}
          />
        </InfiniteComponent>
      )}
    </div>
  );
};

export default ProductList;
