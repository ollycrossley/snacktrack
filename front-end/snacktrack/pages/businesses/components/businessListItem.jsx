export default function BusinessListItem({ business }) {
  return (
    <>
      <tr key={business._id}>
        <th>{business.business_name}</th>
        <th>{business.total_rating}</th>
      </tr>
    </>
  );
}
