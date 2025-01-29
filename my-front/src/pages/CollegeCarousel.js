import React, { useState, useEffect } from 'react';
import './CollegeCarousel.css';

const CollegeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookmarkedColleges, setBookmarkedColleges] = useState(new Set());
  const [isReversing, setIsReversing] = useState(false);

  const colleges = [
    {
      image: '/iiit-b.png',
      name: 'International Institute of Information Technology - [IIIT-B]',
      naacRank: 'AICTE, UGC Approved',
      highestPackage: '₹ 65 LPA',
      passPercentage: '55%',
      brochureLink: 'https://www.iiitb.ac.in/includefiles/userfiles/images/pdf/IIITB%20brochure.pdf',
    },
    {
      image: '/rvce.png',
      name: 'R V College of Engineering - [RVCE]',
      naacRank: 'AICTE, NBA Approved',
      highestPackage: '₹ 92 LPA',
      passPercentage: '65%',
      brochureLink: 'https://rvce.ac.in/wp-content/uploads/2023/04/RVCE-BROCHURE-2023.pdf',
    },
    {
      image: '/ramaiah.png',
      name: 'Ramaiah Institute of Technology - [RIT]',
      naacRank: 'AICTE, NBA Approved',
      highestPackage: '₹ 50 LPA',
      passPercentage: '50%',
      brochureLink: 'https://www.msrit.edu/',
    },
    {
      image: '/bmsce.png',
      name: 'BMS College of Engineering - [BMSCE]',
      naacRank: 'AICTE, COA, UGC, NBA Approved',
      highestPackage: '₹ 50 LPA',
      passPercentage: '45%',
      brochureLink: 'https://bmsce.ac.in/index.php/home/Placement-Brochure',
    },
    {
      image: '/pesu.png',
      name: 'PES University - [PESU]',
      naacRank: 'AICTE, UGC Approved',
      highestPackage: '₹ 65 LPA',
      passPercentage: '--',
      brochureLink: 'https://pes.edu/admissions/',
    },
    {
      image: '/uvce-logo.png',
      name: 'University Visvesvaraya College of Engineering - [UVCE]',
      naacRank: 'AICTE Approved',
      highestPackage: '₹ 48,000',
      passPercentage: '45%',
      brochureLink: 'https://uvce.ac.in/',
    },
    {
      image: '/dsce-logo.png',
      name: 'Dayananda Sagar College of Engineering - [DSCE]',
      naacRank: 'AICTE, UGC, NBA Approved',
      highestPackage: '₹ 5 LPA',
      passPercentage: '--',
      brochureLink: 'https://www.dsce.edu.in/',
    },
    {
      image: '/bit-logo.png',
      name: 'Bangalore Institute of Technology - [BIT]',
      naacRank: 'AICTE, NBA Approved',
      highestPackage: '₹ 92 LPA',
      passPercentage: '--',
      brochureLink: 'https://bit.edu.in/brochure.pdf',
    },
    {
      image: '/ju-logo.png',
      name: 'Jain University - [JU]',
      naacRank: 'AICTE, CRISIL, UGC, NBA, AIU Approved',
      highestPackage: '₹ 54,00,000',
      passPercentage: '--',
      brochureLink: 'https://set.jainuniversity.ac.in/download-brouchure',
    },
    {
      image: '/presidency-logo.png',
      name: 'Presidency University',
      naacRank: 'AICTE, BCI, UGC Approved',
      highestPackage: '₹ 13,58,000',
      passPercentage: '--',
      brochureLink: 'https://www.presidencyuniversity.in/brochure.pdf',
    },
  ];

  const visibleColleges = colleges.slice(0, 10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === 6 && !isReversing) {
          setIsReversing(true);
          return prevIndex - 1;
        }
        if (prevIndex === 0 && isReversing) {
          setIsReversing(false);
          return prevIndex + 1;
        }
        return isReversing ? prevIndex - 1 : prevIndex + 1;
      });
    }, isReversing ? 1500 : 3000);

    return () => clearInterval(interval);
  }, [isReversing]);

  const toggleBookmark = (index) => {
    setBookmarkedColleges((prev) => {
      const updatedBookmarked = new Set(prev);
      if (updatedBookmarked.has(index)) {
        updatedBookmarked.delete(index);
      } else {
        updatedBookmarked.add(index);
      }
      return updatedBookmarked;
    });
  };

  return (
    <div className="college-container">
      <div
        className="college-list"
        style={{
          transform: `translateX(-${currentIndex * 320}px)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {visibleColleges.map((college, index) => (
          <div className="college-card" key={index}>
            <img src={college.image} alt={college.name} className="college-image" />
            <div className="college-details">
              <h2 className="college-name">{college.name}</h2>
              <p className="college-info">NAAC Rank: {college.naacRank}</p>
              <p className="college-info">Highest Package: {college.highestPackage}</p>
              <p className="college-info">Pass Percentage: {college.passPercentage}</p>
              <div className="college-actions">
                <div
                  onClick={() => toggleBookmark(index)}
                  className={`bookmark-icon ${bookmarkedColleges.has(index) ? 'bookmarked' : ''}`}
                ></div>
                <a href={college.brochureLink} target="_blank" rel="noopener noreferrer">
                  <button className="brochure-button">Brochure</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CollegeCarousel;
