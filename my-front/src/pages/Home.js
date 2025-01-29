import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Footer from './Footer'; 

const cardsIndia = [
  { title: "GATE (Graduate Aptitude Test in Engineering)", link: "https://gate2025.iitr.ac.in/", image: "GATE.jpeg" },
  { title: "CAT (Common Admission Test)", link: "https://iimcat.ac.in/per/g06/pub/32842/ASM/WebPortal/1/index.html?32842@@1@@1", image: "cat1.jpeg" },
  { title: "CEED (Common Entrance Exam for Design)", link: "https://www.ceed.iitb.ac.in/2025/", image: "CEED.jpeg" },
  { title: "UGC NET (National Eligibility Test)", link: "https://ugcnet.nta.ac.in/", image: "ugcnet.jpeg" },
  { title: "ICAR AIEEA (Indian Council of Agricultural Research Exam)", link: "https://exams.nta.ac.in/ICAR/", image: "icari.jpeg" },
  { title: "JAM (Joint Admission Test for M.Sc.)", link: "https://gateoffice.iitkgp.ac.in/jam/", image: "jamexam1.jpeg" },
];

const cardsAbroad = [
  { title: "GRE (Graduate Record Examination)", link: "https://www.ets.org/gre.html", image: "GRE1.jpeg" },
  { title: "GMAT (Graduate Management Admission Test)", link: "https://www.mba.com/exams/gmat-exam", image: "GMAT1.jpeg" },
  { title: "LSAT (Law School Admission Test)", link: "https://www.lsac.org/lsat", image: "LSAT.jpeg" },
  { title: "SAT (Scholastic Assessment Test)", link: "https://satsuite.collegeboard.org/sat", image: "SAT.jpeg" },
];

const faqData = [
  {
    question: 'What is the purpose of this platform?',
    answer: 'This platform helps students find career opportunities in various engineering fields, review colleges, and explore different career paths.',
  },
  {
    question: 'How can I write a review?',
    answer: 'Click on the "Write Review" link in the navigation bar to share your feedback about the colleges listed here.',
  },
  {
    question: 'Can I find information about multiple engineering fields?',
    answer: 'Yes, you can explore a variety of engineering fields like Computer Science, Mechanical Engineering, Civil Engineering, and more.',
  },
];

const engineeringFields = [
  {
    field: 'Computer Science',
    jobs: [
      { title: 'Data Scientist', description: 'Analyze large datasets to gain insights and build predictive models.' },
      { title: 'Software Engineer', description: 'Develop, test, and maintain software applications and systems.' },
      { title: 'Machine Learning Engineer', description: 'Design and implement machine learning algorithms.' },
      { title: 'AI Researcher', description: 'Research and develop algorithms in the field of artificial intelligence.' },
      { title: 'Cybersecurity Analyst', description: 'Protect systems, networks, and programs from digital attacks.' },
    ],
  },
  {
    field: 'Mechanical Engineering',
    jobs: [
      { title: 'Mechanical Design Engineer', description: 'Design mechanical systems and products using CAD software.' },
      { title: 'Automobile Engineer', description: 'Work on the design and development of vehicles and their systems.' },
      { title: 'Renewable Energy Engineer', description: 'Design and implement systems to harness renewable energy sources.' },
    ],
  },
  {
    field: 'Civil Engineering',
    jobs: [
      { title: 'Transportation Engineer', description: 'Design and maintain transportation systems like roads and railways.' },
      { title: 'Water Resources Engineer', description: 'Design systems for managing and distributing water resources.' },
      { title: 'Urban Planner', description: 'Plan and design urban spaces, ensuring sustainable growth and infrastructure.' },
      { title: 'Building Information Modeling (BIM) Engineer', description: 'Use advanced software to create detailed 3D models for building projects.' },
      { title: 'Construction Safety Officer', description: 'Ensure safety standards and regulations are met on construction sites to protect workers.' }
    ],
  },  
  {
    field: 'Electrical Engineering',
    jobs: [
      { title: 'Power Systems Engineer', description: 'Design and maintain electrical power generation and distribution systems.' },
      { title: 'Embedded Systems Engineer', description: 'Design and develop embedded systems for various applications like consumer electronics.' },
      { title: 'Renewable Energy Engineer', description: 'Develop and implement systems that generate energy from renewable sources.' },
    ],
  },
  {
    field: 'Chemical Engineering',
    jobs: [
      { title: 'Petroleum Engineer', description: 'Design methods for extracting oil and gas from reservoirs.' },
      { title: 'Process Engineer', description: 'Design and optimize industrial processes for efficiency and safety.' },
      { title: 'Environmental Engineer', description: 'Develop technologies to reduce environmental impact and ensure compliance with regulations.' },
      ],
  },
  {
    field: 'Aerospace Engineering',
    jobs: [
      { title: 'Aeronautical Engineer', description: 'Design and develop aircraft and spacecraft systems and components.' },
      { title: 'Space Systems Engineer', description: 'Develop and manage systems related to satellite or space exploration missions.' },
      { title: 'Flight Test Engineer', description: 'Conduct tests and evaluate aircraft performance to ensure safety and functionality.' },
      { title: 'Avionics Engineer', description: 'Design and develop electronic systems used in aircraft and spacecraft.' },
      { title: 'Propulsion Engineer', description: 'Design and test propulsion systems used in aircraft, spacecraft, and rockets.' },
    ],
  },
  {
    field: 'Biomedical Engineering',
    jobs: [
      { title: 'Clinical Engineer', description: 'Ensure medical equipment is safe and effective for patient use in clinical settings.' },
      { title: 'Bioinformatics Engineer', description: 'Apply engineering principles to biological and medical data analysis.' },
      { title: 'Biomechanics Engineer', description: 'Study the movement of biological systems and design devices that assist in rehabilitation.' },
    ],
  },

  {
    field: 'Industrial Engineering',
    jobs: [
      { title: 'Manufacturing Engineer', description: 'Design and optimize manufacturing processes to improve productivity and quality.' },
      { title: 'Supply Chain Engineer', description: 'Manage and optimize the flow of goods, services, and information in the supply chain.' },
      { title: 'Operations Research Analyst', description: 'Apply mathematical and statistical methods to solve operational problems and improve efficiency.' },
    
    ],
  },
];


const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [questions, setQuestions] = useState('');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (questions) {
      alert(`Your question: "${questions}" has been submitted!`);

      setQuestions('');
    }
  };

  const handleToggleAnswer = (index) => {
    if (activeQuestionIndex === index) {
      setActiveQuestionIndex(null); // Hide answer if clicked again
    } else {
      setActiveQuestionIndex(index);
    }
  };

  const slides = [
    {
      image: '/jss.png',
      collegeName: 'JSS Academy of Technical Education, Bengaluru',
      link: '/college1-reviews',
      description: 'JSS Academy of Technical Education (JSSATEB) in Bengaluru, India offers undergraduate (BE) and postgraduate (ME, MBA, MCA) courses in engineering and business administration.',
    },
    // Other slides...
    {
      image: '/sagar.png',
      collegeName: 'Dayananda Sagar College of Engineering',
      link: '/college2-reviews',
      description: 'DSCE in Bengaluru, India, offers a wide range of undergraduate (BE) and postgraduate (M.Tech) programs in various engineering disciplines, including Aeronautical Engineering, Artificial Intelligence & Machine Learning, Biotechnology, Computer Science, and more.',
    },
    {
      image: '/amc.png',
      collegeName: 'AMC Engineering College',
      link: '/college3-reviews',
      description: 'AMC in Bengaluru, India, offers a variety of undergraduate and postgraduate programs across multiple disciplines, including Animation and Design, Computer Applications and IT, Engineering and Architecture, Management and Business Administration, and Sciences.',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const nextField = () => {
    setCurrentFieldIndex((prevIndex) => (prevIndex + 1) % engineeringFields.length);
  };

  const prevField = () => {
    setCurrentFieldIndex((prevIndex) => (prevIndex - 1 + engineeringFields.length) % engineeringFields.length);
  };

  const field = engineeringFields[currentFieldIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
      {/* Navbar */}
      <div className={`navbar ${isMenuOpen ? 'open' : ''}`}>
        <div className="left">
          <img className="logo" src="feedbacknest.png" alt="Logo" />
          <span style={{ fontFamily: 'Papyrus', fontStyle: 'Fantasy', fontSize: 30, color: 'white' }}>
            FeedbackNest
          </span>
        </div>
        <div className="center">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
        <div className={`right ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/PersonalDetailsForm">Write Review</Link>
          <Link to="/ReadReview">Read Review</Link>
          
          <Link to="/login">Login</Link>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
      </div>

      {/* Slideshow */}
      <div className="slideshow">
        <div className="slide">
        <div
  className="slide-image"
  style={{
    backgroundImage: `url(${slides[currentSlide].image})`
  }}
></div>

          <div className="slide-content">
            <h2>{slides[currentSlide].collegeName}</h2>
            <p>{slides[currentSlide].description}</p>
            <Link to={slides[currentSlide].link} className="review-link">
              View Reviews
            </Link>
          </div>

          {/* Navigation Arrows */}
          <div className="nav-arrows">
            <span className="arrow left" onClick={prevSlide}>
              &#10094;
            </span>
            <span className="arrow right" onClick={nextSlide}>
              &#10095;
            </span>
          </div>
        </div>
      </div>

      {/* Engineering Career Opportunities */}
      <div className="career-guidance-section">
        <h2>Engineering Career Opportunities</h2>
        <div className="slider-container">
          <h3 className="field-heading">{field.field}</h3>
          <div className={`career-cards cards-${field.jobs.length}`}>

            {field.jobs.map((job, index) => (
              <div key={index} className="career-card">
                <h4>{job.title}</h4>
                <p>{job.description}</p>
              </div>
            ))}
          </div>
          <button className="prev-btn" onClick={prevField}>
            ❮
          </button>
          <button className="next-btn" onClick={nextField}>
            ❯
          </button>
        </div>
      </div>

{/* Exam Guidance */}
      <div className="container">
  {/* Section for Master's in India */}
  <h1 className="main-heading">Exam Guidance for Higher Education</h1>
  <h2 className="sub-heading">For Master's in India</h2>
  <div className="grid">
    {cardsIndia.map((card, index) => (
      <a href={card.link} key={index} className="card">
        <div className="card-content">
          <img src={card.image} alt={card.title} className="card-image" />
          <div className="card-title">{card.title}</div>
        </div>
      </a>
    ))}
  </div>
  <br />
  {/* Section for Master's Abroad */}
  <h2 className="sub-heading">For Master's Abroad</h2>
  <div className="grid abroad-grid">
    {cardsAbroad.map((card, index) => (
      <a href={card.link} key={index} className="card">
        <div className="card-content">
          <img src={card.image} alt={card.title} className="card-image" />
          <div className="card-title">{card.title}</div>
        </div>
      </a>
    ))}
  </div>
</div>

      {/* Frequently Asked Questions Section (F) */}      
      <div className="faq-section">
        
        <div className="question-form">
        <p>Have a question?</p>
        <form onSubmit={handleSubmitQuestion}>
        <input
  type="text"
  value={questions}
  onChange={(e) => setQuestions(e.target.value)}
  placeholder="Ask your question..."
  required
/>

          <button type="submit">Submit</button>
        </form>
      </div>
      <p style={{ textAlign: 'left' }}>Frequently Asked Questions</p>
      <div className="faq">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <h4 onClick={() => handleToggleAnswer(index)}>
                {item.question}
                <span className="toggle-icon">
                  {activeQuestionIndex === index ? '-' : '+'}
                </span>
              </h4>
              {activeQuestionIndex === index && <p>{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* User Question Submission Section */}
      <div className="footer">
        <h2>Explore Colleges</h2>
        <Footer />
      </div>
    </div>

  );
};


export default Home;