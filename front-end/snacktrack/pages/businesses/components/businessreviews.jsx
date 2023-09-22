// import { useState } from "react";
// import { useEffect } from "react";
// import { getReviews } from "@/pages/api/api_calls";

// export async function getServerSideProps(context) {
//   const { _id } = context.query;

//   return {
//     props: {
//       _id,
//     },
//   };
// }
// export default function Reviews(_id) {
//   const [reviewsArray, setReviewsArray] = useState([{}]);
//   useEffect(() => {
//     getReviews(_id, setReviewsArray);
//   }, []);
//   console.log(reviewsArray, "array");
//   return (
//     <>
//       <ul>
//         Review List
//         {reviewsArray.map((review) => {
//           console.log(review);
//           return (
//             <li>
//               <h1>Username:{review.customerUsername}</h1>;<h1>{review.body}</h1>
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// }
