"use client";

import CardField from "./CardField";

import { CardFieldType } from "@/types";

const CardList = ({
  fields,
  queryTime,
}: {
  fields: CardFieldType[];
  queryTime?: { fromTime: string; toTime: string };
}) => {
  const fromTime = queryTime?.fromTime;
  const toTime = queryTime?.toTime;

  return (
    <div className="container mx-auto p-4 mt-10 mb-10">
      {fields.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map((field) =>
            fromTime && toTime ? (
              <CardField
                key={field.id}
                field={field}
                queryTime={{ fromTime, toTime }}
              />
            ) : (
              <CardField key={field.id} field={field} />
            ),
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No suitable field found
        </p>
      )}
    </div>
  );
};

export default CardList;
