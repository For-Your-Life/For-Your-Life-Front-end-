import Slider from 'react-slick';
import useInquiry from '../../../../../swr/useInquiry';
const ItemSlider = () => {
  const { data, isLoading } = useInquiry();
  console.log(data);
  const settings = {
    infinite: true,
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
          <>
            <Slider {...settings}>
              {data.map(article => {
                return (
                  <div key={article.id} className="article">
                    {article.title}
                  </div>
                );
              })}
            </Slider>
          </>
        )}
      </div>
      <style jsx>
        {`
          .sliderWrap {
            padding: 10px;
          }
          .article {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 18px;
          }
        `}
      </style>
    </>
  );
};

export default ItemSlider;
