import './carrousel.css';
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { portfolio } from '../../../assets/data.json';
import Card from '../Card/Card';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from '../Modal/Modal';
import Link from '../../atoms/link/Link';
import Button from '../../atoms/Button/Button';

function Carrousel() {
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const sliderRef = useRef(null);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      setCardsPerSlide(1);
    } else if (screenWidth < 1024) {
      setCardsPerSlide(2);
    } else {
      setCardsPerSlide(3);
    }
  };

  const handleKeyDown = (event) => {
    if (sliderRef.current) {
      if (event.key === "ArrowRight") {
        sliderRef.current.slickNext();
      } else if (event.key === "ArrowLeft") {
        sliderRef.current.slickPrev();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    dots: true,
    centerPadding: "50px",
    slidesToShow: cardsPerSlide,
    slidesToScroll: 1,
    speed: 700,
  };

  const openModal = (projectId) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null);
  };

  const getProjectById = (projectId) => {
    return portfolio.find((project) => project.id === projectId);
  };

  const selectedProject = selectedProjectId ? getProjectById(selectedProjectId) : null;

  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
        {portfolio.map((project) => (
          <Card
            key={project.id}
            project={project}
            onCardClick={() => openModal(project.id)}
          />
        ))}
      </Slider>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedProject && (
          <article className="modal-carrousel">
            <h3>{selectedProject.name}</h3>
            <p>{selectedProject.texte}</p>
            <b>{selectedProject.title}</b>
            <ul>
              {Object.keys(selectedProject)
                .filter(key => key.startsWith('objectif'))
                .map(key => (
                  <li key={key}>{selectedProject[key]}</li>
                ))}
            </ul>
            <div>
              <Link url={selectedProject.url} content={<Button text="Site" />} />
              {selectedProject.github && (
                <Link url={selectedProject.github} content={<Button text="Code" />} />
              )}
            </div>
          </article>
        )}
      </Modal>
    </div>
  );
}

export default Carrousel;
