// BLS OEWS May 2025, state estimates. Cross-industry, all ownerships (NAICS 000000; OWN_CODE 1235).
// Source archive: oesm25st.zip, SHA-256 74d5be0e1df865517d22dc3bd1fc3a8af5f6f9e3052a2163143021505d8e04c6.

export type AdvancedPracticeSalary = { employment: number; annual_mean_wage: number; annual_median_wage: number };
type AdvancedPracticeRole = "np" | "pa";

export const ADVANCED_PRACTICE_SALARIES: Record<string, Partial<Record<AdvancedPracticeRole, AdvancedPracticeSalary>>> = {
  "AL": {
    "pa": {
      "employment": 930,
      "annual_mean_wage": 110860,
      "annual_median_wage": 104960
    },
    "np": {
      "employment": 5640,
      "annual_mean_wage": 110970,
      "annual_median_wage": 105750
    }
  },
  "AK": {
    "pa": {
      "employment": 700,
      "annual_mean_wage": 148080,
      "annual_median_wage": 150700
    },
    "np": {
      "employment": 710,
      "annual_mean_wage": 149120,
      "annual_median_wage": 155170
    }
  },
  "AZ": {
    "pa": {
      "employment": 3750,
      "annual_mean_wage": 140850,
      "annual_median_wage": 134650
    },
    "np": {
      "employment": 7220,
      "annual_mean_wage": 140600,
      "annual_median_wage": 134420
    }
  },
  "AR": {
    "pa": {
      "employment": 850,
      "annual_mean_wage": 118430,
      "annual_median_wage": 118430
    },
    "np": {
      "employment": 3970,
      "annual_mean_wage": 130260,
      "annual_median_wage": 125660
    }
  },
  "CA": {
    "pa": {
      "employment": 13600,
      "annual_mean_wage": 169110,
      "annual_median_wage": 165650
    },
    "np": {
      "employment": 25120,
      "annual_mean_wage": 176760,
      "annual_median_wage": 168520
    }
  },
  "CO": {
    "pa": {
      "employment": 3270,
      "annual_mean_wage": 139580,
      "annual_median_wage": 134540
    },
    "np": {
      "employment": 4270,
      "annual_mean_wage": 132540,
      "annual_median_wage": 132930
    }
  },
  "CT": {
    "pa": {
      "employment": 3570,
      "annual_mean_wage": 146930,
      "annual_median_wage": 139860
    },
    "np": {
      "employment": 3750,
      "annual_mean_wage": 142340,
      "annual_median_wage": 138470
    }
  },
  "DE": {
    "pa": {
      "employment": 860,
      "annual_mean_wage": 143840,
      "annual_median_wage": 139350
    },
    "np": {
      "employment": 1430,
      "annual_mean_wage": 132900,
      "annual_median_wage": 131040
    }
  },
  "DC": {
    "pa": {
      "employment": 470,
      "annual_mean_wage": 146230,
      "annual_median_wage": 135140
    },
    "np": {
      "employment": 680,
      "annual_mean_wage": 146470,
      "annual_median_wage": 135880
    }
  },
  "FL": {
    "pa": {
      "employment": 9310,
      "annual_mean_wage": 134470,
      "annual_median_wage": 129620
    },
    "np": {
      "employment": 21790,
      "annual_mean_wage": 130410,
      "annual_median_wage": 129510
    }
  },
  "GA": {
    "pa": {
      "employment": 5610,
      "annual_mean_wage": 112090,
      "annual_median_wage": 115390
    },
    "np": {
      "employment": 10460,
      "annual_mean_wage": 128800,
      "annual_median_wage": 129430
    }
  },
  "HI": {
    "pa": {
      "employment": 530,
      "annual_mean_wage": 146780,
      "annual_median_wage": 164050
    },
    "np": {
      "employment": 550,
      "annual_mean_wage": 142910,
      "annual_median_wage": 135570
    }
  },
  "ID": {
    "pa": {
      "employment": 1320,
      "annual_mean_wage": 132540,
      "annual_median_wage": 133790
    },
    "np": {
      "employment": 1750,
      "annual_mean_wage": 133420,
      "annual_median_wage": 132540
    }
  },
  "IL": {
    "pa": {
      "employment": 3790,
      "annual_mean_wage": 131880,
      "annual_median_wage": 131950
    },
    "np": {
      "employment": 9270,
      "annual_mean_wage": 130940,
      "annual_median_wage": 130680
    }
  },
  "IN": {
    "pa": {
      "employment": 2110,
      "annual_mean_wage": 144260,
      "annual_median_wage": 132050
    },
    "np": {
      "employment": 7450,
      "annual_mean_wage": 126600,
      "annual_median_wage": 128830
    }
  },
  "IA": {
    "pa": {
      "employment": 1200,
      "annual_mean_wage": 139870,
      "annual_median_wage": 134770
    },
    "np": {
      "employment": 3240,
      "annual_mean_wage": 136940,
      "annual_median_wage": 130160
    }
  },
  "KS": {
    "pa": {
      "employment": 890,
      "annual_mean_wage": 127240,
      "annual_median_wage": 125640
    },
    "np": {
      "employment": 3780,
      "annual_mean_wage": 127940,
      "annual_median_wage": 126650
    }
  },
  "KY": {
    "pa": {
      "employment": 1360,
      "annual_mean_wage": 119990,
      "annual_median_wage": 120760
    },
    "np": {
      "employment": 4770,
      "annual_mean_wage": 125010,
      "annual_median_wage": 122870
    }
  },
  "LA": {
    "pa": {
      "employment": 1360,
      "annual_mean_wage": 130290,
      "annual_median_wage": 128870
    },
    "np": {
      "employment": 5380,
      "annual_mean_wage": 126630,
      "annual_median_wage": 125600
    }
  },
  "ME": {
    "pa": {
      "employment": 1030,
      "annual_mean_wage": 134690,
      "annual_median_wage": 131170
    },
    "np": {
      "employment": 1650,
      "annual_mean_wage": 134210,
      "annual_median_wage": 130260
    }
  },
  "MD": {
    "pa": {
      "employment": 2950,
      "annual_mean_wage": 139740,
      "annual_median_wage": 137560
    },
    "np": {
      "employment": 6710,
      "annual_mean_wage": 133360,
      "annual_median_wage": 131110
    }
  },
  "MA": {
    "pa": {
      "employment": 4470,
      "annual_mean_wage": 146480,
      "annual_median_wage": 142410
    },
    "np": {
      "employment": 8070,
      "annual_mean_wage": 152320,
      "annual_median_wage": 142440
    }
  },
  "MI": {
    "pa": {
      "employment": 6310,
      "annual_mean_wage": 132140,
      "annual_median_wage": 131510
    },
    "np": {
      "employment": 8290,
      "annual_mean_wage": 132790,
      "annual_median_wage": 131450
    }
  },
  "MN": {
    "pa": {
      "employment": 3660,
      "annual_mean_wage": 147630,
      "annual_median_wage": 141190
    },
    "np": {
      "employment": 7780,
      "annual_mean_wage": 135890,
      "annual_median_wage": 133260
    }
  },
  "MS": {
    "pa": {
      "employment": 320,
      "annual_mean_wage": 106820,
      "annual_median_wage": 105920
    },
    "np": {
      "employment": 4690,
      "annual_mean_wage": 125340,
      "annual_median_wage": 124730
    }
  },
  "MO": {
    "pa": {
      "employment": 2300,
      "annual_mean_wage": 137710,
      "annual_median_wage": 135130
    },
    "np": {
      "employment": 7710,
      "annual_mean_wage": 130970,
      "annual_median_wage": 129930
    }
  },
  "MT": {
    "pa": {
      "employment": 600,
      "annual_mean_wage": 140800,
      "annual_median_wage": 141470
    },
    "np": {
      "employment": 1260,
      "annual_mean_wage": 135290,
      "annual_median_wage": 137210
    }
  },
  "NE": {
    "pa": {
      "employment": 1330,
      "annual_mean_wage": 132810,
      "annual_median_wage": 133040
    },
    "np": {
      "employment": 2340,
      "annual_mean_wage": 131710,
      "annual_median_wage": 132130
    }
  },
  "NV": {
    "pa": {
      "employment": 1090,
      "annual_mean_wage": 135790,
      "annual_median_wage": 134660
    },
    "np": {
      "employment": 1930,
      "annual_mean_wage": 137410,
      "annual_median_wage": 140670
    }
  },
  "NH": {
    "pa": {
      "employment": 1060,
      "annual_mean_wage": 150150,
      "annual_median_wage": 150960
    },
    "np": {
      "employment": 1770,
      "annual_mean_wage": 138070,
      "annual_median_wage": 137550
    }
  },
  "NJ": {
    "pa": {
      "employment": 4790,
      "annual_mean_wage": 162100,
      "annual_median_wage": 165690
    },
    "np": {
      "employment": 9950,
      "annual_mean_wage": 155750,
      "annual_median_wage": 159310
    }
  },
  "NM": {
    "pa": {
      "employment": 700,
      "annual_mean_wage": 134670,
      "annual_median_wage": 139920
    },
    "np": {
      "employment": 1770,
      "annual_mean_wage": 143510,
      "annual_median_wage": 137520
    }
  },
  "NY": {
    "pa": {
      "employment": 19140,
      "annual_mean_wage": 155150,
      "annual_median_wage": 160880
    },
    "np": {
      "employment": 22890,
      "annual_mean_wage": 153900,
      "annual_median_wage": 153510
    }
  },
  "NC": {
    "pa": {
      "employment": 7490,
      "annual_mean_wage": 130030,
      "annual_median_wage": 129360
    },
    "np": {
      "employment": 9800,
      "annual_mean_wage": 130870,
      "annual_median_wage": 128990
    }
  },
  "ND": {
    "pa": {
      "employment": 510,
      "annual_mean_wage": 130930,
      "annual_median_wage": 133450
    },
    "np": {
      "employment": 1290,
      "annual_mean_wage": 126370,
      "annual_median_wage": 130070
    }
  },
  "OH": {
    "pa": {
      "employment": 4900,
      "annual_mean_wage": 136560,
      "annual_median_wage": 132090
    },
    "np": {
      "employment": 15400,
      "annual_mean_wage": 122910,
      "annual_median_wage": 124870
    }
  },
  "OK": {
    "pa": {
      "employment": 1770,
      "annual_mean_wage": 138700,
      "annual_median_wage": 136550
    },
    "np": {
      "employment": 3620,
      "annual_mean_wage": 134200,
      "annual_median_wage": 133390
    }
  },
  "OR": {
    "pa": {
      "employment": 2250,
      "annual_mean_wage": 155300,
      "annual_median_wage": 155780
    },
    "np": {
      "employment": 2820,
      "annual_mean_wage": 155780,
      "annual_median_wage": 155680
    }
  },
  "PA": {
    "pa": {
      "employment": 9020,
      "annual_mean_wage": 125160,
      "annual_median_wage": 127070
    },
    "np": {
      "employment": 10670,
      "annual_mean_wage": 132070,
      "annual_median_wage": 130140
    }
  },
  "RI": {
    "pa": {
      "employment": 810,
      "annual_mean_wage": 146630,
      "annual_median_wage": 139930
    },
    "np": {
      "employment": 1180,
      "annual_mean_wage": 143150,
      "annual_median_wage": 135970
    }
  },
  "SC": {
    "pa": {
      "employment": 2250,
      "annual_mean_wage": 120720,
      "annual_median_wage": 122490
    },
    "np": {
      "employment": 5670,
      "annual_mean_wage": 124170,
      "annual_median_wage": 123290
    }
  },
  "SD": {
    "pa": {
      "employment": 680,
      "annual_mean_wage": 131910,
      "annual_median_wage": 133200
    },
    "np": {
      "employment": 1020,
      "annual_mean_wage": 125160,
      "annual_median_wage": 128840
    }
  },
  "TN": {
    "pa": {
      "employment": 2240,
      "annual_mean_wage": 117300,
      "annual_median_wage": 118240
    },
    "np": {
      "employment": 12150,
      "annual_mean_wage": 115510,
      "annual_median_wage": 117590
    }
  },
  "TX": {
    "pa": {
      "employment": 10110,
      "annual_mean_wage": 135850,
      "annual_median_wage": 134550
    },
    "np": {
      "employment": 25970,
      "annual_mean_wage": 131420,
      "annual_median_wage": 131670
    }
  },
  "UT": {
    "pa": {
      "employment": 1610,
      "annual_mean_wage": 132530,
      "annual_median_wage": 134740
    },
    "np": {
      "employment": 2740,
      "annual_mean_wage": 137060,
      "annual_median_wage": 130920
    }
  },
  "VT": {
    "pa": {
      "employment": 410,
      "annual_mean_wage": 152520,
      "annual_median_wage": 150490
    },
    "np": {
      "employment": 700,
      "annual_mean_wage": 139400,
      "annual_median_wage": 134740
    }
  },
  "VA": {
    "pa": {
      "employment": 4340,
      "annual_mean_wage": 142630,
      "annual_median_wage": 135940
    },
    "np": {
      "employment": 7110,
      "annual_mean_wage": 129060,
      "annual_median_wage": 127810
    }
  },
  "WA": {
    "pa": {
      "employment": 3540,
      "annual_mean_wage": 164430,
      "annual_median_wage": 164360
    },
    "np": {
      "employment": 6700,
      "annual_mean_wage": 152180,
      "annual_median_wage": 156100
    }
  },
  "WV": {
    "pa": {
      "employment": 1080,
      "annual_mean_wage": 128830,
      "annual_median_wage": 128610
    },
    "np": {
      "employment": 2550,
      "annual_mean_wage": 126780,
      "annual_median_wage": 127320
    }
  },
  "WI": {
    "pa": {
      "employment": 3580,
      "annual_mean_wage": 136750,
      "annual_median_wage": 133950
    },
    "np": {
      "employment": 5160,
      "annual_mean_wage": 135160,
      "annual_median_wage": 131980
    }
  },
  "WY": {
    "pa": {
      "employment": 330,
      "annual_mean_wage": 137320,
      "annual_median_wage": 136080
    },
    "np": {
      "employment": 440,
      "annual_mean_wage": 132680,
      "annual_median_wage": 132200
    }
  }
};

export function advancedPracticeSalary(careerSlug: string, stateAbbr: string): AdvancedPracticeSalary | undefined {
  const role: AdvancedPracticeRole | undefined = careerSlug === "nurse-practitioner" ? "np" : careerSlug === "physician-assistant" ? "pa" : undefined;
  return role ? ADVANCED_PRACTICE_SALARIES[stateAbbr]?.[role] : undefined;
}
