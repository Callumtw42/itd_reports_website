import { createDBList } from "./useDBMenu";
import { obj } from "../../../../../lib/datafns";

test("createDBList", () => {
    let data: obj[] = [
        { schema_name: "x" },
        { schema_name: "y" },
        { schema_name: "z" },
    ];
    expect(createDBList(data)).toEqual(["x", "y", "z"]);
});
