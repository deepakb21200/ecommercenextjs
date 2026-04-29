// "use client";

 
// import { useAuthStore } from "@/components/user/store/api";
// import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";
// import { useCustomerProfileStore } from "@/store/home/profile/store";
// import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

// export default function CustomerProfileDialog() {
//   const {
//     isOpen,
//     closeProfile,
//     mode,
//     startAdd,
//     startEdit,
//     updateForm,
//     cancelForm,
//     saveForm,
//     removeAddress,
//     items,
//     form,
//   } = useCustomerProfileStore();

//   const { points } = useCustomerCartAndCheckoutStore((s) => s);
//   const { user } = useAuthStore();

//   if (!isOpen) return null;

//   const showForm = mode !== "none";

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
//       <div className="w-full max-w-4xl bg-white rounded-xl p-6 space-y-6">

//         {/* Header */}
//         <div className="flex justify-between">
//           <div>
//             <h2 className="text-lg font-semibold">{user?.username}</h2>
//             <p className="text-sm text-gray-500">{user?.email}</p>
//           </div>
//           <span className="border px-3 py-1 rounded-full text-sm">
//             Points: {points}
//           </span>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">

//           {/* Address List */}
//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <h3 className="font-medium">Addresses</h3>
//               <button onClick={startAdd} className="text-sm flex gap-1">
//                 <FaPlus /> Add
//               </button>
//             </div>

//             {items.map((item) => (
//               <div key={item._id} className="border p-3 rounded-lg space-y-2">
//                 <p className="font-medium">{item.fullName}</p>
//                 <p className="text-sm text-gray-500">
//                   {item.address}, {item.state}
//                 </p>

//                 <div className="flex gap-2">
//                   <button onClick={() => startEdit(item)}>
//                     <FaEdit />
//                   </button>
//                   <button onClick={() => removeAddress(item._id)}>
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Form */}
//           {showForm && (
//             <div className="space-y-3">
//               <input
//                 value={form.fullName}
//                 onChange={(e) => updateForm("fullName", e.target.value)}
//                 placeholder="Full Name"
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 value={form.address}
//                 onChange={(e) => updateForm("address", e.target.value)}
//                 placeholder="Address"
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 value={form.state}
//                 onChange={(e) => updateForm("state", e.target.value)}
//                 placeholder="State"
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 value={form.postalCode}
//                 onChange={(e) => updateForm("postalCode", e.target.value)}
//                 placeholder="Postal Code"
//                 className="w-full border p-2 rounded"
//               />

//               <div className="flex justify-end gap-2">
//                 <button onClick={cancelForm}>Cancel</button>
//                 <button
//                   onClick={() => saveForm()}
//                   className="bg-black text-white px-4 py-2 rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         <button
//           onClick={closeProfile}
//           className="absolute top-4 right-4"
//         >
//           ✕
//         </button>
//       </div>
//     </div>
//   );
// }




"use client";
 
import { useAuthStore } from "@/components/user/store/api";
import { useCustomerCartAndCheckoutStore } from "@/store/home/cartAndCheckout/store";
import { useCustomerProfileStore } from "@/store/home/profile/store";
import {
  RiUserLine,
  RiMapPinLine,
  RiAddLine,
  RiPencilLine,
  RiDeleteBin6Line,
  RiStarLine,
  RiCheckboxCircleLine,
  RiCloseLine,
} from "react-icons/ri";
 

function CustomerProfileDialog() {
  const {
    isOpen,
    closeProfile,
    mode,
    startAdd,
    startEdit,
    updateForm,
    cancelForm,
    saveForm,
    removeAddress,
    items,
    form,
  } = useCustomerProfileStore();

  const { points } = useCustomerCartAndCheckoutStore((state) => state);
  const { user } = useAuthStore();

  const showForm = mode !== "none";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <RiUserLine className="text-gray-700 text-lg" />
            <h2 className="text-base font-semibold text-gray-900">Profile</h2>
          </div>
          <button
            onClick={closeProfile}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <RiCloseLine className="text-lg" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

          {/* Account Card */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <RiUserLine className="text-gray-500 text-lg" />
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">{user?.username}</p>
                <p className="text-sm text-gray-400">{user?.email}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-700">
              <RiStarLine className="text-sm" />
              {points} Points
            </span>
          </div>

          {/* Grid */}
          <div className={showForm ? "grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" : "grid gap-6"}>

            {/* Addresses */}
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <RiMapPinLine className="text-gray-400 text-base" />
                  <h3 className="text-sm font-semibold text-gray-900">Saved Addresses</h3>
                </div>
                <button
                  onClick={startAdd}
                  className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <RiAddLine className="text-sm" />
                  Add Address
                </button>
              </div>

              {!items.length ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 py-12 text-gray-400">
                  <RiMapPinLine className="text-4xl opacity-25" />
                  <p className="text-sm">No addresses added</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-xl border border-gray-100 p-4 hover:border-gray-200 hover:shadow-sm transition-all duration-200 space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-900">{item.fullName}</p>
                            {item?.isDefault && (
                              <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                                <RiCheckboxCircleLine className="text-xs" />
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">
                            {item.address}, {item.state}, {item.postalCode}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(item)}
                          className="inline-flex items-center gap-1.5 h-7 px-3 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <RiPencilLine className="text-sm" />
                          Edit
                        </button>
                        <button
                          onClick={() => void removeAddress(item._id)}
                          className="inline-flex items-center gap-1.5 h-7 px-3 text-xs font-medium border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <RiDeleteBin6Line className="text-sm" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Address Form */}
            {showForm && (
              <section className="rounded-xl border border-gray-100 bg-gray-50 p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  {mode === "edit" ? "Edit Address" : "Add Address"}
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-600">Full Name</label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors bg-white"
                      value={form.fullName}
                      onChange={(e) => updateForm("fullName", e.target.value)}
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-600">Address</label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors bg-white"
                      value={form.address}
                      onChange={(e) => updateForm("address", e.target.value)}
                      placeholder="Address"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-600">State</label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors bg-white"
                      value={form.state}
                      onChange={(e) => updateForm("state", e.target.value)}
                      placeholder="State"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-600">Postal Code</label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors bg-white"
                      value={form.postalCode}
                      onChange={(e) => updateForm("postalCode", e.target.value)}
                      placeholder="Postal Code"
                    />
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(e) => updateForm("isDefault", e.target.checked)}
                    className="h-4 w-4 accent-black"
                  />
                  Set as default address
                </label>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={cancelForm}
                    className="h-8 px-4 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => void saveForm()}
                    className="h-8 px-4 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    {mode === "edit" ? "Update Address" : "Save Address"}
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfileDialog;