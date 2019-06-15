# Programming Principals


respect bounderies
What unkowns do you have
what are your dependencies

### Start it, plan it, finish it.
If you want to do a migration of code, investigate the effect that your change has on the rest of the code base. Define a path to a complete migration instead of leaving a partial migration.


### attributes to assess your design
- readability
- testability
- searchability
- extensability

### No surprises
Constant type returns.
Explicitness is key.

### Think about the implications of your code.
What is the cost of having a computed property, what is the cost of DI a pure function service vs importing a module?

### Don't try build everything
Incremental improvements in the context of the ideal architecture are cheaper, and allow us to finish phases easier then trying to rebuild all the code.

### Things to think about when designing your architecture
1. Define your problem statement
2. What are the advantages of your solution
3. What are the tradeoffs
4. What are the constraints.
5. What are the roles and responsibilities of the different elements of your design
