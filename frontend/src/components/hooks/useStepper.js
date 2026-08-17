const useStepper = (stepsCompleted) => {
  const firstIncompleteIndex = stepsCompleted.findIndex(
    (completed) => !completed
  );

  const currentStep =
    firstIncompleteIndex === -1
      ? stepsCompleted.length
      : firstIncompleteIndex + 1;

  return {
    currentStep,
  };
};

export default useStepper;