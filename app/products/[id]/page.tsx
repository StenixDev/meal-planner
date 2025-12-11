async function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>Product ID is {id}</div>;
}
export default Product;
