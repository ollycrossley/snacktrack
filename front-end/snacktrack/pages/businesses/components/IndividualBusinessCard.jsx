import Link from "next/link";

export default function BusinessListItem({ businesses }) {
  return (
    <>
      {businesses.map((business) => {
        return (
          <li
            key={business.business_name}
            className="$menu-item-hover-background-color"
          >
            <Link href={`/businesses/${business._id}`}>
              <div className="card" id="business-card">
                <div className="card-image"></div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left"></div>
                    <div className="media-content">
                      <p className="title is-4">{business.business_name}</p>
                      <p className="subtitle is-6">
                        {business.is_active === true
                          ? "Active now"
                          : "Inactive"}
                      </p>
                      <p className="subtitle is-6">
                        Rating: {business.total_rating}({business.no_of_ratings}
                        )
                      </p>
                    </div>
                  </div>
                  <div className="content"></div>
                </div>
              </div>
              <br></br>
            </Link>
          </li>
        );
      })}
    </>
  );
}
