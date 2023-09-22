export default function BusinessListItem({ business }) {
  return (
    <>
      <ul>
        <li key={business._id}>
          {business.business_name}
          <div className="card">
            <div className="card-image"></div>
            <div className="card-content">
              <div className="media">
                <div className="media-left"></div>
                <div className="media-content">
                  <p className="title is-4">{business.business_name}</p>
                  <p></p>
                  <p className="subtitle is-6">
                    Rating: {business.total_rating}({business.no_of_ratings})
                  </p>
                  <p className="subtitle is-6">
                    {business.is_active === true ? "Active now" : "Inactive"}
                  </p>
                </div>
              </div>
              <div className="content"></div>
            </div>
          </div>
          <br></br>
        </li>
      </ul>
    </>
  );
}
