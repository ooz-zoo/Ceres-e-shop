// // BranchSelectionForm.js
// import React, { useState } from "react";
// import "./branchselection.css";

// function BranchSelectionForm() {
//   const [selectedBranch, setSelectedBranch] = useState(""); // State to hold the selected branch

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Redirect to the selected branch page
//     window.location.href = `/shop`;
//   };

//   return (
//     <div>
//       <h2>Select Branch</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="branch">Branch:</label>
//           <select
//             id="branch"
//             value={selectedBranch}
//             onChange={(e) => setSelectedBranch(e.target.value)}
//             required
//           >
//             <option value="">Select Branch</option>
//             <option value="hq">HQ</option>
//             <option value="nairobi">Nairobi</option>
//             <option value="mombasa">Mombasa</option>
//           </select>
//         </div>
//         <button type="submit">Proceed to Shop</button>
//       </form>
//     </div>
//   );
// }

// export default BranchSelectionForm;

//tetsing updates
