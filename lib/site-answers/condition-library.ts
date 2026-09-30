import conditions from './conditions.json';

export const conditionLibraryPath = '/faq-lafayette/condition-library';
export { conditions };

export function conditionQuestions(condition: typeof conditions[number]) {
  const names = [condition.title, ...condition.aliases];
  return [
    { id: `${condition.id}-definition`, question: `What is ${condition.title.toLowerCase()}?`, answer: condition.definition,
      aliases: names.flatMap(name => [name, `What is ${name}?`, `What does ${name} mean?`, `Explain ${name}`]) },
    { id: `${condition.id}-symptoms`, question: `What are the symptoms of ${condition.title.toLowerCase()}?`, answer: condition.symptoms,
      aliases: names.flatMap(name => [`${name} symptoms`, `What are the symptoms of ${name}?`, `What does ${name} feel like?`, `What are signs of ${name}?`]) },
    { id: `${condition.id}-care`, question: `How is ${condition.title.toLowerCase()} usually treated?`, answer: condition.care,
      aliases: names.flatMap(name => [`${name} treatment`, `How is ${name} treated?`, `How is ${name} managed?`, `What helps ${name}?`, `What is the treatment for ${name}?`]) },
  ];
}
