import Link from "next/link";

export default function BusinessListItem({
  businesses,
  showOnlyActive,
  ratingsIncreasing,
}) {
  const allBusinessesIncreasing = [...businesses].sort((a, b) => {
    return a.total_rating - b.total_rating;
  });

  const allBusinessesDecreasing = [...businesses].sort((a, b) => {
    return b.total_rating - a.total_rating;
  });

  const activeBusinessesIncreasing = [...allBusinessesIncreasing].filter(
    (business) => {
      return business.is_active === true;
    }
  );

  const activeBusinessesDecreasing = [...allBusinessesDecreasing].filter(
    (business) => {
      return business.is_active === true;
    }
  );

  // const onlyActiveSortedBusinesses = function () {
  //   if (showOnlyActive && ratingsIncreasing) {
  //     [...businesses].sort((a, b) => {
  //       return b.total_rating - a.total_rating;
  //     });
  //   }
  //   if (showOnlyActive && !ratingsIncreasing) {
  //     [...businesses].sort((a, b) => {
  //       return a.total_rating - b.total_rating;
  //     });
  //   }
  // };

  // const allSortedBusinesses = function (active) {
  //   if (!showOnlyActive && ratingsIncreasing) {
  //     [...businesses].sort((a, b) => {
  //       return b.total_rating - a.total_rating;
  //     });
  //   }
  //   if (!showOnlyActive && !ratingsIncreasing) {
  //     [...businesses].sort((a, b) => {
  //       return a.total_rating - b.total_rating;
  //     });
  //   }
  // };
  if (!showOnlyActive) {
    if (ratingsIncreasing) {
      console.log("!ratingsDecreasing");
      return (
        <>
          {allBusinessesIncreasing.map((business) => {
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
                            Rating: {business.total_rating}(
                            {business.no_of_ratings})
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
    if (!ratingsIncreasing) {
      console.log("!ratingsIncreasing");
      return (
        <>
          {allBusinessesDecreasing.map((business) => {
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
                            Rating: {business.total_rating}(
                            {business.no_of_ratings})
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
  }
  if (showOnlyActive) {
    if (ratingsIncreasing) {
      return (
        <>
          {activeBusinessesIncreasing.map((business) => {
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
                            Rating: {business.total_rating}(
                            {business.no_of_ratings})
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
    if (!ratingsIncreasing) {
      return (
        <>
          {activeBusinessesDecreasing.map((business) => {
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
                            Rating: {business.total_rating}(
                            {business.no_of_ratings})
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
  }
}
