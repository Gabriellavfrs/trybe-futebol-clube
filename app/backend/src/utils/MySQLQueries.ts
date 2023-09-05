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

export default homeLeaderboardQuery;
