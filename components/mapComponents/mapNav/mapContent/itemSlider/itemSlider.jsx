import Slider from 'react-slick';
import '../../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../../node_modules/slick-carousel/slick/slick-theme.css';
import useInquiry from '../../../../../swr/useInquiry';
import { useRouter } from 'next/router';
import { FaPlusCircle } from 'react-icons/fa';
const ItemSlider = () => {
  const { data, isLoading } = useInquiry();
  const router = useRouter();
  const settings = {
    infinite: true,
    className: 'slider variable-width',
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 1800,
    cssEase: 'cubic-bezier(0.85, 0, 0.15, 1)',
    arrows: false,
  };
  return (
    <>
      <div className="sliderWrap">
        {isLoading ? (
          <div>로딩중</div>
        ) : (
          <div className="newsWrap">
            <div className="newsTitle" onClick={() => router.push('/inquiry')}>
              <FaPlusCircle />
            </div>
            <Slider {...settings}>
              {data.map(article => {
                return (
                  <div
                    key={article.id}
                    className="article"
                    onClick={() => router.push(`/inquiry/${article.id}`)}
                  >
                    {article.title}
                  </div>
                );
              })}
            </Slider>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .sliderWrap {
            padding: 14px 10px 10px 10px;
            background-color: rgb(212, 250, 251);
          }
          .article {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 18px;
            cursor: pointer;
          }
          .newsWrap {
            display: flex;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .newsTitle {
              padding-right: 10px;
              cursor: pointer;
            }
          }
        `}
      </style>
    </>
  );
};

export default ItemSlider;
