import Task from "classes/Task";
import { StatIcons } from "components/Stats";
import { useState } from "react";

const initTailwindDict = () => {
  const categoryDict = Object.fromEntries(
    Object.keys(Task.Category).map((k) => [
      k,
      { id: Task.Category[k], color: "", icon: StatIcons[k] },
    ]),
  );
  categoryDict.ACADEMIC.color = "bg-blue border-blue-dark border-4";
  categoryDict.SOCIAL.color = "bg-red border-red-dark border-4";
  categoryDict.ENERGY.color = "bg-yellow border-yellow-dark border-4";
  categoryDict.MENTAL.color = "bg-green border-green-dark border-4";

  return categoryDict;
};

export default function TaskFilterBar({ setTaskFilterFunction }) {
  const tailwindDict = initTailwindDict();
  const [filterAttribute, setFilterAttribute] = useState();

  return (
    <>
      <small className="w-full block text-center mt-2 text-lg">
        Filter by:
      </small>
      <div className="mx-auto flex mb-4 justify-center">
        <div className="inline-flex gap-8 p-4 inline-block bg-gray-400 rounded-md">
          {Object.keys(tailwindDict).map((key) => {
            const attribute = tailwindDict[key];
            return (
              <div
                className={`size-[50px] relative text-3xl ${attribute.color} rounded-lg hover:scale-[1.05] transition-transform ${filterAttribute === attribute.id ? "border-white" : ""}`}
              >
                <button
                  key={attribute.id}
                  className="size-full"
                  onClick={() =>
                    setTaskFilterFunction(() => {
                      if (filterAttribute === attribute.id) {
                        setFilterAttribute(null);
                        return undefined; // clear the filter
                      }
                      setFilterAttribute(attribute.id);
                      return (task) => task.category === attribute.id;
                    })
                  }
                >
                  {attribute.icon}
                </button>

                {attribute.id === filterAttribute && (
                  <svg
                    className="absolute inset-0 size-[30px] bg-gray-200/50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inset-1/2 pointer-events-none"
                    fill="#444"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 460.775 460.775"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
                c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
                c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
                c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
                l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
                c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
