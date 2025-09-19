import { FooterGroupLinksProps } from "@interfaces";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FooterGroupLinks = (props: FooterGroupLinksProps) => {
  const [t] = useTranslation();
  return (
    <div className="footer_links wow fadeInUp" data-wow-delay="0.3s">
      <h1 className="font-bold mb-3">{t(`${props.title}`)}</h1>
      <ul className="flex flex-col">
        {props.links.map((link, index) => (
          <li className="mb-2" key={index}>
            <Link to={`${link.to}`} className="text-sub-title text-sm">
              {t(`${link.text}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterGroupLinks;
