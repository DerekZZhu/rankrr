import { useState, useEffect } from 'react';
import './App.css';

// Flat list of profiles
const initialProfiles = [
  {
    id: 1,
    name: "Derek Zhu",
    elo: 1000,
    image: "/vite.svg",
    "experiences": [
      {
        "company": "Tencent Games",
        "position": "Software Engineer Intern",
        "duration": "1 mo",
        "dates": "Apr 2025 - Present",
        "location": "Seattle, Washington, United States · Remote",
        "description": ""
      },
      {
        "company": "Foy Lab",
        "position": "Research Assistant",
        "duration": "4 mos",
        "dates": "Jan 2025 - Present",
        "location": "Seattle, Washington, United States · On-site",
        "description": "https://foylab.xyz/index.html"
      },
      {
        "company": "Paul G. Allen School of Computer Science & Engineering",
        "position": "Teaching Assistant",
        "duration": "1 yr 5 mos",
        "dates": "Dec 2023 - Present",
        "location": "Seattle, Washington, United States",
        "description": "TA + Course Logistics for CSE 444 (Database Systems) TA for CSE 414 (Non-major Introduction to Databases) Skills: Java · Relational Databases · Debugging"
      },
      {
        "company": "Paul G. Allen School of Computer Science & Engineering",
        "position": "Machine Learning Researcher",
        "duration": "1 yr 4 mos",
        "dates": "Jan 2024 - Apr 2025",
        "location": "Seattle, Washington, United States · On-site",
        "description": "Undergraduate Researcher (Mentored by PhD student Zixuan Liu) Currently pursuing research in enhancing diffusion models to operate on animations and videos Skills: HuggingFace · Machine Learning · Python · Computer Vision · PyTorch"
      },
      {
        "company": "Paul G. Allen School of Computer Science & Engineering",
        "position": "NLP Researcher",
        "duration": "9 mos",
        "dates": "Mar 2024 - Nov 2024",
        "location": "Seattle, Washington, United States",
        "description": "Undergraduate Researcher being mentored by Taylor Sorenson Currently researching fact-verification, commonsense, and pluralistic alignment in Large Language Models Skills: Python · HuggingFace · PyTorch"
      },
      {
        "company": "UW Medicine",
        "position": "Medical Assistant",
        "duration": "6 mos",
        "dates": "Nov 2024 - Apr 2025",
        "location": "Washington, United States · On-site",
        "description": "Medical Shadow and Research Assistant for UW Hematology - Currently developing a model that uses ViTs and transformers to analyze single-cell RNA sequencing data and map out hematopoietic differentiation pathways - Processed over 40,000 samples of blood cells to classify rare cell populations and clusters - Conducted hands on research and testing involving techniques like clustering, embedding, and random forest classification Skills: PyTorch"
      },
      {
        "company": "Amazon",
        "position": "SDE Intern",
        "duration": "6 mos",
        "dates": "Jun 2024 - Nov 2024",
        "location": "Seattle, Washington, United States · On-site",
        "description": "Intern at the Amazon Media Services team - Used Java to help build and scale a new API to view product transaction histories in the millions - Designed and built a full-stack internal tool with React.js requested by multiple other teams. - Optimized the user-interface for ease-of-use to non-technical users - Worked extensively with DynamoDB, AWS Lamda, and Terraform Skills: Java · Amazon Dynamodb"
      },
      {
        "company": "Seattle Children's",
        "position": "Software Developer",
        "duration": "7 mos",
        "dates": "Oct 2023 - Apr 2024",
        "location": "Seattle, Washington, United States · On-site",
        "description": "Software Developer - Helped contribute to 3 research papers in psychology and cognitive science - Developed a webscraper and API to scrape over 50k pieces of data - Used python to process massive JSON datasets Skills: Machine Learning · Python (Programming Language) · Text Mining · Web Scraping · MySQL"
      },
      {
        "company": "Ubiquitous Computing Lab",
        "position": "Research Assistant",
        "duration": "1 yr 6 mos",
        "dates": "Oct 2022 - Mar 2024",
        "location": "Seattle, Washington, United States · On-site",
        "description": "Undergraduate Research Assistant Skills: Python (Programming Language) · Android Development · OpenCV · Kotlin"
      },
      {
        "company": "UW Medicine",
        "position": "Student Researcher",
        "duration": "1 yr 1 mo",
        "dates": "Nov 2021 - Nov 2022",
        "location": "United States",
        "description": "Research Assistant and Full-Stack Developer in UW Medicine (Kidney Pathology) - Used Pytorch and Sklearn to implement and deploy segmentation models for kidney disease detection - Used Flask and docker to develop and deploy web service hosting said models Skills: Python (Programming Language) · Flask · PyTorch · Docker"
      },
      {
        "company": "Mathnasium - The Math Learning Center",
        "position": "Instructor",
        "duration": "8 mos",
        "dates": "Nov 2021 - Jun 2022",
        "location": "United States",
        "description": ""
      },
      {
        "company": "Inspur Systems",
        "position": "Frontend Web Developer",
        "duration": "3 mos",
        "dates": "Oct 2021 - Dec 2021",
        "location": "Washington, United States",
        "description": "Full-stack web development intern at Inspur Technologies - Used MySQL and database tools to shift static webpages to dynamic pages - Built and used simple Python web-scraper to automate the process - Redesigned product pages for better UX Skills: Python (Programming Language) · JavaScript · HTML · MySQL"
      }
    ],
    "education": [
      {
        "school": "University of Washington",
        "degree": "Computer Science, Applied Mathematical and Computing Sciences",
        "dates": "2021 - 2025",
        "gpa": "3.8",
        "activities": "Research Assistant @ Yang Lab, Najafian Lab, Ubicomp Lab, Security and Privacy, and RAIVN Supervisor of UW Data Collection Team (for grad research) Batman's Kitchen, I2, and Husky Coding Project"
      }
    ],
    "accomplishments": []
  },
  {
    id: 3,
    name: "Dowland Aiello",
    elo: 1000,
    image: "/vite.svg",
    "experiences": [
      {
        "company": "Timewave",
        "position": "Junior Software Engineer",
        "duration": "9 mos",
        "dates": "Mar 2024 - Nov 2024",
        "location": "",
        "description": ""
      },
      {
        "company": "Coditum Coding Classes",
        "position": "Senior Teacher",
        "duration": "3 yrs 11 mos",
        "dates": "Sep 2019 - Jul 2023",
        "location": "Purchase, New York",
        "description": "Taught data-structures and algorithms in Python and Java and intermediate to introductory-level classes for web-oriented frameworks like React."
      },
      {
        "company": "Vision",
        "position": "Chief Technology Officer",
        "duration": "10 mos",
        "dates": "Apr 2022 - Jan 2023",
        "location": "",
        "description": ""
      },
      {
        "company": "MachineSP",
        "position": "Software Engineer Intern",
        "duration": "4 mos",
        "dates": "Jun 2021 - Sep 2021",
        "location": "",
        "description": "Data science-focused software internship. Designed and implemented data processing systems in Python with Pandas and CuDF."
      },
      {
        "company": "SO BOTZ, FRC Team #6911",
        "position": "Software Engineer",
        "duration": "1 yr 10 mos",
        "dates": "Sep 2019 - Jun 2021",
        "location": "",
        "description": "Acted as software subteam co-lead at Tappan Zee High School's robotics team over the 2020-2021 school year: implemented computer vision algorithms for autonomous robot operation, and organized subteam operations, trainings, and source control procedures."
      },
      {
        "company": "Heywear",
        "position": "Software Consultant",
        "duration": "8 mos",
        "dates": "Sep 2020 - Apr 2021",
        "location": "",
        "description": "Designed and implemented full-stack retail database, business logic, and front-end software as an Intern in a collaborative, procedure-driven work environment."
      },
      {
        "company": "Heywear",
        "position": "Software Intern",
        "duration": "2 mos",
        "dates": "Jul 2020 - Aug 2020",
        "location": "",
        "description": ""
      }
    ],
    "education": [
      {
        "school": "University of Washington",
        "degree": "Bachelor's degree, Computer Science",
        "dates": "2021 - 2025",
        "gpa": "",
        "activities": "Vice President of Huskies for Liberty, a free-speech advocacy group."
      }
    ],
    "accomplishments": []
  }
];

function App() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [currentMatch, setCurrentMatch] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [lastEloChanges, setLastEloChanges] = useState({});

  // load an initial match on mount only.
  useEffect(() => {
    const shuffled = [...profiles].sort(() => 0.5 - Math.random());
    setCurrentMatch(shuffled.slice(0, 2));
  }, []); 

  const calculateEloChange = (winner, loser) => {
    const K = 32;
    const expected = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
    const randomFactor = isSignedIn ? 0 : Math.floor(Math.random() * 3) + 15;
    return isSignedIn ? Math.round(K * (1 - expected)) : randomFactor;
  };

  const handleVote = (selectedId) => {
    if (hasVoted) return;

    const winner = currentMatch.find(p => p.id === selectedId);
    const loser = currentMatch.find(p => p.id !== selectedId);
    if (!winner || !loser) return;

    const change = calculateEloChange(winner, loser);

    // update da elo
    const updatedProfiles = profiles.map(p => {
      if (p.id === winner.id) return { ...p, elo: p.elo + change };
      if (p.id === loser.id) return { ...p, elo: p.elo - change };
      return p;
    });

    setProfiles(updatedProfiles);
    setLastEloChanges({ [winner.id]: change, [loser.id]: -change });
    setHasVoted(true);
    setVoteCount(prev => prev + 1);
  };

  const loadNextMatch = () => {
    const shuffled = [...profiles].sort(() => 0.5 - Math.random());
    setCurrentMatch(shuffled.slice(0, 2));
    setHasVoted(false);
    setLastEloChanges({});
  };

  const toggleSignIn = () => setIsSignedIn(prev => !prev);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <header className="w-full max-w-4xl flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-600">Husky Rankrr</h1>
        <button onClick={toggleSignIn} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {isSignedIn ? "Sign Out" : "Sign In"}
        </button>
      </header>

      <div className="mb-4 text-center">
        <p className="text-lg text-gray-700">
          {isSignedIn
            ? "You're signed in. Votes use the standard Elo algorithm."
            : "You're not signed in. Simplified Elo (15-17 pts) will be used."}
        </p>
        <p className="text-sm text-gray-500 mt-2">Votes recorded: {voteCount}</p>
      </div>

      {currentMatch.length === 2 && (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-row">
            <ProfileCard 
              profile={currentMatch[0]} 
              onVote={handleVote} 
              hasVoted={hasVoted}
              lastEloChanges={lastEloChanges}
            />
            <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                VS
              </div>
              {hasVoted && (
                <button 
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={loadNextMatch}
                >
                  Next Match
                </button>
              )}
            </div>
            <ProfileCard 
              profile={currentMatch[1]} 
              onVote={handleVote} 
              hasVoted={hasVoted}
              lastEloChanges={lastEloChanges}
            />
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-gray-500">
        <p>Click on a profile to vote. This will update their Elo rating.</p>
      </div>
    </div>
  );
}

const ProfileCard = ({ profile, onVote, hasVoted, lastEloChanges }) => {
  const eloChange = lastEloChanges[profile.id];

  return (
    <div 
      className="flex-1 p-6 cursor-pointer hover:bg-blue-50 transition-colors"
      onClick={() => onVote(profile.id)}
    >
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 overflow-hidden flex items-center justify-center text-gray-500">
          {hasVoted ? (
            <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl font-semibold">Hidden</span>
          )}
        </div>
        
        {/* elo rating Change will be shown after voting */}
        {hasVoted && (
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full">
              Elo: {profile.elo}{" "}
              {eloChange > 0 ? `(+${eloChange})` : eloChange < 0 ? `(${eloChange})` : ""}
            </span>
          </div>
        )}
        
        {hasVoted ? (
          <h2 className="text-xl font-bold text-gray-800 mb-2">{profile.name}</h2>
        ) : (
          <div className="h-6 mb-2 w-24 bg-gray-300 rounded animate-pulse" />
        )}

        <div className="text-left w-full">
          <h3 className="font-semibold text-gray-700">Experience</h3>
          {profile.experiences?.map((exp, idx) => (
            <p key={idx} className="text-gray-600">
              {exp.position} @ {exp.company} ({exp.dates})
            </p>
          ))}

          <h3 className="mt-4 font-semibold text-gray-700">Education</h3>
          {profile.education?.map((edu, idx) => (
            <p key={idx} className="text-gray-600">
              {edu.degree} - {edu.school} ({edu.dates})
            </p>
          ))}

          <h3 className="mt-4 font-semibold text-gray-700">Accomplishments</h3>
          {profile.accomplishments?.length > 0 ? (
            <ul className="list-disc ml-5 text-gray-600">
              {profile.accomplishments.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">None listed</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;