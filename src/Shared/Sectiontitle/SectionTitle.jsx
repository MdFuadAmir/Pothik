const SectionTitle = ({ sectionTitle, sectionSubTitle }) => {
  return (
    <div className="space-y-1 mb-12 text-center">
      <h2 class="text-3xl font-bold mb-4">{sectionTitle}</h2>
      <p class="text-gray-600 text-sm mb-10">
        {sectionSubTitle}
      </p>
    </div>
  );
};

export default SectionTitle;
