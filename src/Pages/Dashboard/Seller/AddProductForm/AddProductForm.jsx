const categories = [
  { title: "Electronics" },
  { title: "Mobiles" },
  { title: "Fashion" },
  { title: "Home" },
  { title: "Grocery" },
  { title: "Beauty" },
  { title: "Baby" },
  { title: "Men's" },
  { title: "Women's" },
  { title: "Computers" },
  { title: "Kitchen" },
  { title: "Sports" },
  { title: "Shoes" },
  { title: "Watches" },
  { title: "Bags" },
  { title: "Gaming" },
];

const AddProductForm = ({
  handleMultiImageUpload,
  productImages,
  onSubmit,
  uploading,
  selectedCategory,
  handleSubmit,
  register,
  errors,
}) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2  p-4 rounded mb-12 bg-gray-900/80"
      >
        <p className="font-bold text-xl text-emerald-400">Basic Info</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* 1 */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-200">Product Name *</label>
            <input
              {...register("productName", {
                required: "Product name is required",
              })}
              type="text"
              className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="product name .."
            />
            {errors.productName && (
              <p className="text-red-600 text-sm">
                {errors.productName.message}
              </p>
            )}
          </div>
          {/* 2 */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-200">Brand *</label>
            <input
              {...register("brand", { required: "Brand is required" })}
              type="text"
              className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="brand .."
            />
            {errors.brand && (
              <p className="text-red-600 text-sm">{errors.brand.message}</p>
            )}
          </div>
          {/* 3 */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-200">SKU / Product Code *</label>
            <input
              {...register("skuCode", { required: "Brand is required" })}
              type="text"
              className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="skuCode .."
            />
            {errors.skuCode && (
              <p className="text-red-600 text-sm">{errors.skuCode.message}</p>
            )}
          </div>
          {/* 4 */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-200">Category *</label>
            <select
              {...register("category", { required: "Select one category" })}
              className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.title} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm">{errors.category.message}</p>
            )}
          </div>
          {/* 5 */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-200">Regular Price *</label>
            <input
              {...register("regularPrice", {
                required: "Reguler price is required",
              })}
              type="number"
              className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="regular price .."
            />
            {errors.regularPrice && (
              <p className="text-red-600 text-sm">
                {errors.regularPrice.message}
              </p>
            )}
          </div>
          {/* 6 */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-200">Discount Price</label>
            <input
              {...register("discountPrice")}
              type="number"
              className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="discount price .."
            />
          </div>
          {/* 7 */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-200">Stock Quantity *</label>
            <input
              {...register("stockQua", {
                required: "stock Quantity is required",
              })}
              type="number"
              className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="stock quantity .."
            />
            {errors.stockQua && (
              <p className="text-red-600 text-sm">{errors.stockQua.message}</p>
            )}
          </div>
          {/* 8 */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-200">Return Policy *</label>
            <select
              {...register("returnPolicy", {
                required: "Return policy is required",
              })}
              className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="">Select Return Policy</option>
              <option value="no-return">No Return</option>
              <option value="3-days">3 Days Return</option>
              <option value="7-days">7 Days Return</option>
              <option value="10-days">10 Days Return</option>
              <option value="14-days">14 Days Return</option>
              <option value="30-days">30 Days Return</option>
              <option value="6-month">6 month Return</option>
              <option value="1-year">1 year Return</option>
              <option value="2-year">2 year Return</option>
            </select>

            {errors.returnPolicy && (
              <p className="text-red-600 text-sm">
                {errors.returnPolicy.message}
              </p>
            )}
          </div>
        </div>
        {/* //========= category spacific input field ==============// */}
        {/* fashion */}
        {(selectedCategory === "Fashion" ||
          selectedCategory === "Men's" ||
          selectedCategory === "Women's" ||
          selectedCategory === "Shoes" ||
          selectedCategory === "Baby") && (
          <div className="mt-4">
            <h2 className="text-lg  font-bold mb-4 text-emerald-400">Details Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1 */}
              <div>
                <label className="text-sm text-gray-200">Size (comma separated)*</label>
                <input
                  {...register("size", { required: "Size is required" })}
                  type="text"
                  className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="S, M, L, XL"
                />
                {errors.size && (
                  <p className="text-red-600 text-sm">{errors.size.message}</p>
                )}
              </div>
              {/* 2 */}
              <div>
                <label className="text-sm text-gray-200">Color (comma separated)*</label>
                <input
                  {...register("color", { required: "Color is required" })}
                  type="text"
                  className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Red, Blue, Black"
                />
                {errors.color && (
                  <p className="text-red-600 text-sm">{errors.color.message}</p>
                )}
              </div>
              {/* 3 */}
              <div>
                <label className="text-sm text-gray-200">Fabric Type *</label>
                <input
                  {...register("fabric", {
                    required: "Fabric Type is required",
                  })}
                  className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Denim, Cotton, Wool"
                />
                {errors.fabric && (
                  <p className="text-red-600 text-sm">
                    {errors.fabric.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Grocery */}
        {selectedCategory === "Grocery" && (
          <div className="mt-4">
            <p className="font-bold text-lg mb-3 text-emerald-400">Details Info</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1 */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-200">Weight / packet*</label>
                <input
                  {...register("weightQty", {
                    required: "Weight is required",
                  })}
                  className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="1kg / 500g"
                />
                {errors.weightQty && (
                  <p className="text-red-600 text-sm">
                    {errors.weightQty.message}
                  </p>
                )}
              </div>
              {/* 2 */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-200">Ingredients *</label>
                <input
                  {...register("ingredients", {
                    required: "ingredients is required",
                  })}
                  className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Milk, Sugar, Wheat, Rice, etc."
                />
                {errors.ingredients && (
                  <p className="text-red-600 text-sm">
                    {errors.ingredients.message}
                  </p>
                )}
              </div>
              {/* 3 */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-200">Packaging Type *</label>

                <select
                  {...register("packagingType", {
                    required: "Packaging Type is required",
                  })}
                  className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="">-- Select Packaging Type --</option>
                  <option value="Pouch">Pouch</option>
                  <option value="Box">Box</option>
                  <option value="Bottle">Bottle</option>
                  <option value="Jar">Jar</option>
                  <option value="Packet">Packet</option>
                </select>

                {errors.packagingType && (
                  <p className="text-red-600 text-sm">
                    {errors.packagingType.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Electronics,Mobiles,Computers,Watches */}
        {(selectedCategory === "Electronics" ||
          selectedCategory === "Mobiles" ||
          selectedCategory === "Computers" ||
          selectedCategory === "Watches") && (
          <div className="mt-4">
            <p className="font-bold text-lg mb-3 text-emerald-400">Details Info</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1 */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-200">Model *</label>
                <input
                  {...register("model", {
                    required: "Model is required",
                  })}
                  className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="model .."
                />
                {errors.model && (
                  <p className="text-red-600 text-sm">{errors.model.message}</p>
                )}
              </div>
              {/* 2 */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-200">Condition *</label>

                <select
                  {...register("condition", {
                    required: "Condition is required",
                  })}
                  className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
                {errors.condition && (
                  <p className="text-red-600 text-sm">
                    {errors.condition.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Short Description */}
        <div className="flex flex-col mt-4">
          <label className="text-sm text-gray-200">Short Description *</label>
          <input
            {...register("shortDescription", {
              required: "Short description is required",
              maxLength: {
                value: 70,
                message: "Maximum 70 characters allowed",
              },
            })}
            type="text"
            className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter short product summary..."
          />
          {errors.shortDescription && (
            <p className="text-red-600 text-sm">
              {errors.shortDescription.message}
            </p>
          )}
        </div>
        {/* Long Description */}
        <div className="flex flex-col mt-4">
          <label className="text-sm  text-gray-200">Long Description *</label>
          <textarea
            {...register("longDescription", {
              required: "Long description is required",
              minLength: {
                value: 50,
                message: "Minimum 50 characters required",
              },
            })}
            className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Write full product details here..."
          ></textarea>
          {errors.longDescription && (
            <p className="text-red-600 text-sm">
              {errors.longDescription.message}
            </p>
          )}
        </div>
        {/* images */}
        <div className="flex flex-wrap gap-4 my-6">
          {/* preview */}
          {productImages.map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img}
                alt=""
                className="w-24 h-24 rounded object-cover border"
              />
            </div>
          ))}
          {/* Upload Input (NO register) */}
          <input
            type="file"
            multiple
            onChange={handleMultiImageUpload}
            className="w-full px-3 py-2 rounded border border-gray-300 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          {/* Hidden form field */}
          <input
            type="hidden"
            {...register("images", { required: "At least 1 image needed" })}
          />

          {errors.images && (
            <p className="text-red-600 text-sm">{errors.images.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className={`w-full mt-4 cursor-pointer px-4 py-2 rounded bg-emerald-600 font-bold text-white
    ${uploading && "bg-emerald-900 cursor-not-allowed"}`}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
