export interface OlympicsDetail {
  id: number
  name: string
  gold_medals: string
  silver_medals: string
  bronze_medals: string
  symbol: string
  detail: Detail[]
}

export interface Detail {
  sport: string
  gender: string
  name: string
  medal: string
}

export interface CountryDetail {
  id: number
  population: string
  capital: string
  traditional_food: string
}
