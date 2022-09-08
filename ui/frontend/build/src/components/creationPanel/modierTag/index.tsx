import React from "react";

// export default function ModifierTag({name}) {
//   return (
//     <p>{name}</p>
//   );
// };

type ModifierTagProps = {
  name: string;
}

export default function ModifierTag({name}: ModifierTagProps) {

  const _toggleTag = () => {
    console.log('toggle tag', name);
  };

  return (
    <div className="modiferTag" onClick={_toggleTag}>
      <p>{name}</p>
    </div>
  );
}