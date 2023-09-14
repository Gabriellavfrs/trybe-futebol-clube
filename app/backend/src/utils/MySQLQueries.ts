const homeLeaderboardQuery = `SELECT team_name AS name,
CAST(SUM(pointsByMatch) AS SIGNED) AS totalPoints,
COUNT(pointsByMatch) AS totalGames,
COUNT(CASE WHEN pointsByMatch = 3 THEN 1 ELSE NULL END) AS totalVictories,
COUNT(CASE WHEN pointsByMatch = 1 THEN 1 ELSE NULL END) AS totalDraws,
COUNT(CASE WHEN pointsByMatch = 0 THEN 1 ELSE NULL END) AS totalLosses,
CAST(SUM(home_team_goals) AS SIGNED) AS goalsFavor,
CAST(SUM(away_team_goals) AS SIGNED) AS goalsOwn,
CAST((SUM(home_team_goals) - SUM(away_team_goals)) AS SIGNED) AS goalsBalance,
ROUND((SUM(pointsByMatch) / (COUNT(pointsByMatch) * 3)) * 100, 2) AS efficiency
FROM (
SELECT t.team_name, m.home_team_goals, m.away_team_goals,
CASE 
WHEN m.home_team_goals > m.away_team_goals THEN 3
WHEN m.home_team_goals = m.away_team_goals THEN 1
ELSE 0 
END AS pointsByMatch
FROM teams AS t
LEFT JOIN matches AS m
ON t.id = m.home_team_id
WHERE m.in_progress = false
) AS subquery
GROUP BY team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;`;

const awayLeaderboardQuery = `SELECT team_name AS name,
CAST(SUM(pointsByMatch) AS SIGNED) AS totalPoints,
COUNT(pointsByMatch) AS totalGames,
COUNT(CASE WHEN pointsByMatch = 3 THEN 1 ELSE NULL END) AS totalVictories,
COUNT(CASE WHEN pointsByMatch = 1 THEN 1 ELSE NULL END) AS totalDraws,
COUNT(CASE WHEN pointsByMatch = 0 THEN 1 ELSE NULL END) AS totalLosses,
CAST(SUM(away_team_goals) AS SIGNED) AS goalsFavor,
CAST(SUM(home_team_goals) AS SIGNED) AS goalsOwn,
CAST((SUM(away_team_goals) - SUM(home_team_goals)) AS SIGNED) AS goalsBalance,
ROUND((SUM(pointsByMatch) / (COUNT(pointsByMatch) * 3)) * 100, 2) AS efficiency
FROM (
SELECT t.team_name, m.home_team_goals, m.away_team_goals,
CASE 
WHEN m.home_team_goals < m.away_team_goals THEN 3
WHEN m.home_team_goals = m.away_team_goals THEN 1
ELSE 0 
END AS pointsByMatch
FROM teams AS t
LEFT JOIN matches AS m
ON t.id = m.away_team_id
WHERE m.in_progress = false
) AS subquery
GROUP BY team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;`;

const allLeaderboardQuery = `SELECT team_name AS name,
CAST(SUM(pointsByMatch) AS SIGNED) AS totalPoints,
COUNT(pointsByMatch) AS totalGames,
COUNT(CASE WHEN pointsByMatch = 3 THEN 1 ELSE NULL END) AS totalVictories,
COUNT(CASE WHEN pointsByMatch = 1 THEN 1 ELSE NULL END) AS totalDraws,
COUNT(CASE WHEN pointsByMatch = 0 THEN 1 ELSE NULL END) AS totalLosses,
CAST(SUM(team_goals) AS SIGNED) AS goalsFavor,
CAST(SUM(opponent_goals) AS SIGNED) AS goalsOwn,
CAST((SUM(team_goals) - SUM(opponent_goals)) AS SIGNED) AS goalsBalance,
ROUND((SUM(pointsByMatch) / (COUNT(pointsByMatch) * 3)) * 100, 2) AS efficiency
FROM (
SELECT * FROM teams as t
INNER JOIN (
SELECT home_team_id AS team_id, away_team_id AS opponent_id, 
home_team_goals AS team_goals, away_team_goals AS opponent_goals,
CASE 
WHEN home_team_goals > away_team_goals THEN 3
WHEN home_team_goals = away_team_goals THEN 1
ELSE 0 
END AS pointsByMatch
FROM matches
WHERE in_progress = false
UNION ALL
SELECT away_team_id AS team_id,  home_team_id AS opponent_id, 
away_team_goals AS team_goals, home_team_goals AS opponent_goals,
CASE 
WHEN away_team_goals > home_team_goals THEN 3
WHEN away_team_goals = home_team_goals THEN 1
ELSE 0 
END AS pointsByMatch
FROM matches
WHERE in_progress = false
) AS combined ON t.id = combined.team_id
) AS subquery
GROUP BY team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;`;

export {
  homeLeaderboardQuery,
  awayLeaderboardQuery,
  allLeaderboardQuery,
};
