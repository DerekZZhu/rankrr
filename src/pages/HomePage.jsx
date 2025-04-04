import { useState, useEffect } from 'react';
import './HomePage.css';
import { initialProfiles } from '../data';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [currentMatch, setCurrentMatch] = useState([]);
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [lastEloChanges, setLastEloChanges] = useState({});
  const { isAuthenticated, user } = useAuth();

  // load an initial match on mount only.
  useEffect(() => {
    const shuffled = [...profiles].sort(() => 0.5 - Math.random());
    setCurrentMatch(shuffled.slice(0, 2));
  }, []); 

  const calculateEloChange = (winner, loser) => {
    const K = 32;
    const expected = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
    const randomFactor = isAuthenticated ? 0 : Math.floor(Math.random() * 3) + 15;
    return isAuthenticated ? Math.round(K * (1 - expected)) : randomFactor;
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

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="mb-4 text-center">
        <p className="text-lg text-gray-700">
          {isAuthenticated
            ? `Welcome back, ${user?.name || 'User'}! Votes use the standard Elo algorithm.`
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

export default HomePage;