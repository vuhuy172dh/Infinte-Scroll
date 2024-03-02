import { Avatar, List } from 'antd';
import { FC } from 'react';

export type ProductProps = {
  id: string;
  description: string;
  images: Array<string>;
  price: number;
  title: string;
};

const ProductCard: FC<ProductProps> = ({
  description,
  images,
  price,
  title,
}) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={images[0]} />}
        title={<strong>{title}</strong>}
        description={description}
      />
      <div>{price}$</div>
    </List.Item>
  );
};

export default ProductCard;
