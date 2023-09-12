const matches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Internacional',
    },
    awayTeam: {
      teamName: 'Santos',
    },
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Corinthians',
    },
    awayTeam: {
      teamName: 'Napoli-SC',
    },
  },
];

const matchesInProgress = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Internacional',
    },
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'Ferroviária',
    },
    awayTeam: {
      teamName: 'Avaí/Kindermann',
    },
  },
];

const finishedMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Internacional',
    },
    awayTeam: {
      teamName: 'Santos',
    },
  },
];

const createValidBody = {
  homeTeamId: 3,
  awayTeamId: 9,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const createInvalidBody = {
  homeTeamId: 3,
  awayTeamId: 3,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const createInvalidTeam = {
  homeTeamId: 3,
  awayTeamId: 999,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const homeTeam = {
  id: 3,
  teamName: 'Botafogo',
};

const awayTeam = {
  id: 9,
  teamName: 'Internacional',
};

const createdMatch = {
  id: 1,
  homeTeamId: 3,
  homeTeamGoals: 2,
  awayTeamId: 9,
  awayTeamGoals: 2,
  inProgress: true
}

export {
  matches,
  matchesInProgress,
  finishedMatches,
  createValidBody,
  homeTeam,
  awayTeam,
  createdMatch,
  createInvalidBody,
  createInvalidTeam,
}