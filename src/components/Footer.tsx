const Footer = () => {
  const taglines = [
    "Math with a side of shade",
    "Probably judging your input",
    "Better than the one you used in school",
    "No refunds on wrong answers",
    "Low effort, high impact",
    "Sleek code, sharp tongue",
    "Running on vibes, not logic",
    "Answers may vary. Attitude won't.",
    "If it breaks, it builds character",
    "Your math teacher wouldn’t approve",
    "Error-prone by design",
    "Not your average number cruncher",
    "Calculating... sarcasm included",
    "Handle with sarcasm",
    "Works 60% of the time, every time"
  ];
  const tagline = taglines[Math.floor(Math.random() * taglines.length)];
  console.log(tagline);

  return (
    <footer>
      <p>
        &#10031;Product of <strong>Divonacci</strong> | {tagline}&#10031;
      </p>
    </footer>
  );
};

export default Footer;
