export const isLowRisk = score => score >= 80;

export const isModerateRisk = score => score < 80 && score >= 50;

export const isHighRisk = score => score < 50

export const totalPassing = stat =>
  stat.total_complete_passes + stat.total_spf_fails_dkim_passes + stat.total_dkim_fails_spf_passes;

export const totalFailing = stat => stat.total_incidents - totalPassing(stat) - stat.total_forwards;
