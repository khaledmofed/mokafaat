import { useWebsiteProvider } from "@hooks";

const DEFAULT_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29609.873854496233!2d46.7386!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1716588056633!5m2!1sen!2seg";

const CompanyLocationOnMap = () => {
  const { contactInfos } = useWebsiteProvider();
  const embedUrl =
    contactInfos?.mapLat && contactInfos?.mapLong
      ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29609.873854496233!2d${contactInfos.mapLong}!3d${contactInfos.mapLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1716588056633!5m2!1sen!2seg`
      : DEFAULT_EMBED;

  return (
    <div className="company-location">
      <iframe
        src={embedUrl}
        width="100%"
        height="auto"
        loading="lazy"
        className="rounded-lg"
        title="موقع الشركة"
      />
    </div>
  );
};

export default CompanyLocationOnMap;
