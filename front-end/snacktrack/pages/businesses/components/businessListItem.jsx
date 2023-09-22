export default function BusinessListItem({ business }) {
  return (
    <>
      <ul>
        <li key={business._id}>{business.business_name}`</li>
      </ul>
    </>
  );
}
