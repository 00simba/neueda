const Home = () => {
 //fake news articles
  const newsArticles = [
    {
      headline: "Tech Giants Lead Market Rally as NASDAQ Hits Record High",
      details: "The NASDAQ Composite surged to a new record high today, driven by strong performances from major tech companies. Apple (AAPL) led the charge, closing up 4% after reporting better-than-expected earnings. Microsoft (MSFT) and Alphabet (GOOGL) also posted significant gains, rising 3% and 2.5% respectively. Investors are optimistic about the continued growth prospects in the tech sector, despite concerns over inflation and potential interest rate hikes."
    },
    {
      headline: "Energy Stocks Soar as Oil Prices Hit 7-Year High",
      details: "Energy stocks rallied sharply today as crude oil prices reached their highest levels in seven years. ExxonMobil (XOM) and Chevron (CVX) both saw their shares climb over 5%, while smaller players like Marathon Oil (MRO) and Occidental Petroleum (OXY) experienced double-digit percentage gains. The rise in oil prices comes amid tightening supply and increasing demand, boosting investor confidence in the energy sector."
    },
    {
      headline: "Financial Sector Gains on Positive Economic Data",
      details: "The financial sector posted solid gains today following the release of encouraging economic data. The S&P 500 Financials Index rose by 2%, with major banks like JPMorgan Chase (JPM) and Bank of America (BAC) leading the way. The latest GDP report showed stronger-than-expected growth, and jobless claims fell to their lowest levels in over a year, signaling a robust economic recovery that is expected to benefit financial institutions."
    },
    {
      headline: "Pharmaceutical Stocks Jump as FDA Approves New COVID-19 Treatment",
      details: "Pharmaceutical stocks surged today after the FDA granted emergency use authorization for a new COVID-19 treatment developed by Pfizer (PFE). Pfizer's shares rose by 6% on the news, while other companies in the sector, such as Moderna (MRNA) and Johnson & Johnson (JNJ), also saw their stocks climb. The approval of this new treatment is seen as a significant step forward in the fight against the pandemic, providing a boost to the pharmaceutical industry."
    },
    {
      headline: "Retail Stocks Slide as Supply Chain Issues Persist",
      details: "Retail stocks fell sharply today as ongoing supply chain disruptions continue to impact the sector. Major retailers like Walmart (WMT) and Target (TGT) saw their shares drop by 3% and 2.5% respectively. Supply chain bottlenecks and increased shipping costs are affecting inventory levels and profit margins, leading to concerns about the upcoming holiday shopping season. Analysts warn that these issues could persist into the next year, putting further pressure on retail stocks."
    }
  ];

  return (
    <div className="bg-white p-4 rounded shadow-md">
    <div className="text-xl font-semibold mb-4">Market News</div>
    {newsArticles.map((article, index) => (
      <div key={index} className="p-4 bg-gray-100 rounded shadow-sm mb-4">
        <div className="text-lg font-semibold">{article.headline}</div>
        <div className="text-sm text-gray-500 mt-2">{article.details}</div>
      </div>
    ))}
  </div>
  );
};

export default Home;
