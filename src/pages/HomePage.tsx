import { Input, InputProps } from 'antd';
import { useState } from 'react';
import { ProductList } from '../components/List/index.ts';
import { debounce } from '../helpers/index.ts';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch: InputProps['onChange'] = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.homePage}>
      <h1>Product List</h1>
      <Input
        className={styles.searchInput}
        placeholder="Input search text"
        onChange={debounce(handleSearch, 300)}
      />
      <ProductList search={searchValue} />
    </div>
  );
};

export default HomePage;
