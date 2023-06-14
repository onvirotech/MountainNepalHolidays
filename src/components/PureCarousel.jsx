import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import MediaQuery from "react-responsive";

const PureCarousel = ({ purecarousel }) => {
  const carouselMain = purecarousel;
  const sliderImages = carouselMain?.map((item) => item) || [];
  const [selectedImg, setSelectedImg] = React.useState(sliderImages[0]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleBackClick = () => {
    setSelectedIndex(selectedIndex - 1);
    setSelectedImg(
      selectedIndex - 1 < 0 ? selectedImg : sliderImages[selectedIndex - 1]
    );
  };
  const handleNextClick = () => {
    setSelectedIndex(selectedIndex + 1);
    setSelectedImg(
      selectedIndex + 1 >= sliderImages.length
        ? selectedImg
        : sliderImages[selectedIndex + 1]
    );
  };

  return (
    <>
      <div className="row pt-4">
        <div className="col-md-7">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={52}
            totalSlides={sliderImages.length}
            dragEnabled={false}
            className="carousel_main"
          >
            <MediaQuery maxWidth={1000}>
              {(matches) => (
                <Slider
                  dragEnabled={matches ? false : false}
                  touchEnabled={matches ? false : false}
                >
                  {sliderImages.map((img, index) => (
                    <Slide key={index}>
                      <div className="gallery_img_a">
                        <img
                          src={sliderImages[selectedIndex]}
                          onClick={() => setSelectedImg(img)}
                          alt="Selected"
                        />
                      </div>
                    </Slide>
                  ))}
                </Slider>
              )}
            </MediaQuery>

            <ButtonBack onClick={handleBackClick} className="button_scroll">
              &#8249;
            </ButtonBack>

            <ButtonNext onClick={handleNextClick} className="button_scroll_b">
              &#8250;
            </ButtonNext>
          </CarouselProvider>
        </div>
        <div className="col-md-5 all_gallery_img d-flex flex-wrap justify-content-around">
          {sliderImages.map((img, index) => (
            <img
              key={index}
              style={{
                border: index === selectedIndex ? "4px solid #112A41" : "",
              }}
              src={sliderImages[index]}
              onClick={() => {
                setSelectedIndex(index);
                setSelectedImg(img);
              }}
              alt="Selected"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PureCarousel;
