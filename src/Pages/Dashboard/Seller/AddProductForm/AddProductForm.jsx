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
        className="space-y-2 border p-4 rounded mb-12"
      >
        <p className="font-bold text-sm">Basic Info</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* 1 */}
          <div className="flex flex-col">
            <label className="text-sm">Product Name *</label>
            <input
              {...register("productName", {
                required: "Product name is required",
              })}
              type="text"
              className="input w-full focus:border-none"
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
            <label className="text-sm">Brand *</label>
            <input
              {...register("brand", { required: "Brand is required" })}
              type="text"
              className="input w-full focus:border-none"
              placeholder="brand .."
            />
            {errors.brand && (
              <p className="text-red-600 text-sm">{errors.brand.message}</p>
            )}
          </div>
          {/* 3 */}
          <div className="flex flex-col">
            <label className="text-sm">SKU / Product Code *</label>
            <input
              {...register("skuCode", { required: "Brand is required" })}
              type="text"
              className="input w-full focus:border-none"
              placeholder="skuCode .."
            />
            {errors.skuCode && (
              <p className="text-red-600 text-sm">{errors.skuCode.message}</p>
            )}
          </div>
          {/* 4 */}
          <div className="flex flex-col">
            <label className="text-sm">Category *</label>
            <select
              {...register("category", { required: "Select one category" })}
              className="border px-3 py-2 rounded w-full"
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
            <label className="text-sm">Regular Price *</label>
            <input
              {...register("regularPrice", {
                required: "Reguler price is required",
              })}
              type="number"
              className="input w-full focus:border-none"
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
            <label className="text-sm">Discount Price</label>
            <input
              {...register("discountPrice")}
              type="number"
              className="input w-full focus:border-none"
              placeholder="discount price .."
            />
          </div>
          {/* 7 */}
          <div className="flex flex-col">
            <label className="text-sm">Stock Quantity *</label>
            <input
              {...register("stockQua", {
                required: "stock Quantity is required",
              })}
              type="number"
              className="input w-full focus:border-none"
              placeholder="stock quantity .."
            />
            {errors.stockQua && (
              <p className="text-red-600 text-sm">{errors.stockQua.message}</p>
            )}
          </div>
          {/* 8 */}
          <div className="flex flex-col">
            <label className="text-sm">Return Policy *</label>
            <select
              {...register("returnPolicy", {
                required: "Return policy is required",
              })}
              className="border px-3 py-2 rounded w-full"
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
            <h2 className="text-sm font-bold mb-4">Details Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1 */}
              <div>
                <label className="text-sm">Size (comma separated)*</label>
                <input
                  {...register("size", { required: "Size is required" })}
                  type="text"
                  className="input w-full"
                  placeholder="S, M, L, XL"
                />
                {errors.size && (
                  <p className="text-red-600 text-sm">{errors.size.message}</p>
                )}
              </div>
              {/* 2 */}
              <div>
                <label className="text-sm">Color (comma separated)*</label>
                <input
                  {...register("color", { required: "Color is required" })}
                  type="text"
                  className="input w-full"
                  placeholder="Red, Blue, Black"
                />
                {errors.color && (
                  <p className="text-red-600 text-sm">{errors.color.message}</p>
                )}
              </div>
              {/* 3 */}
              <div>
                <label className="text-sm">Fabric Type *</label>
                <input
                  {...register("fabric", {
                    required: "Fabric Type is required",
                  })}
                  className="input w-full"
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
            <p className="font-bold text-sm mb-3">Details Info</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1 */}
              <div className="flex flex-col">
                <label className="text-sm">Weight / packet*</label>
                <input
                  {...register("weightQty", {
                    required: "Weight is required",
                  })}
                  className="input w-full"
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
                <label className="text-sm">Ingredients *</label>
                <input
                  {...register("ingredients", {
                    required: "ingredients is required",
                  })}
                  className="input w-full"
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
                <label className="text-sm font-medium">Packaging Type *</label>

                <select
                  {...register("packagingType", {
                    required: "Packaging Type is required",
                  })}
                  className="border px-3 py-2 rounded w-full"
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
            <p className="font-bold text-sm mb-3">Details Info</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1 */}
              <div className="flex flex-col">
                <label className="text-sm">Model *</label>
                <input
                  {...register("model", {
                    required: "Model is required",
                  })}
                  className="input w-full"
                  placeholder="model .."
                />
                {errors.model && (
                  <p className="text-red-600 text-sm">{errors.model.message}</p>
                )}
              </div>
              {/* 2 */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">Condition *</label>

                <select
                  {...register("condition", {
                    required: "Condition is required",
                  })}
                  className="border px-3 py-2 rounded w-full"
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
          <label className="text-sm">Short Description *</label>
          <input
            {...register("shortDescription", {
              required: "Short description is required",
              maxLength: {
                value: 70,
                message: "Maximum 70 characters allowed",
              },
            })}
            type="text"
            className="border px-3 py-2 rounded w-full"
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
          <label className="text-sm">Long Description *</label>
          <textarea
            {...register("longDescription", {
              required: "Long description is required",
              minLength: {
                value: 50,
                message: "Minimum 50 characters required",
              },
            })}
            className="border px-3 py-2 rounded w-full min-h-[150px]"
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
            className="w-full px-4 py-3 rounded-lg border cursor-pointer"
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
          className={`w-full mt-4 cursor-pointer px-4 py-2 rounded bg-blue-300 font-bold
    ${uploading && "bg-gray-400 cursor-not-allowed"}`}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
