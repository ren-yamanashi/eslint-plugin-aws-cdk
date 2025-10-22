import { consola } from "consola";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  PACKAGE_MANGER,
  PACKAGE_MANGER_VALUES,
  PackageManager,
  selectPackageManager,
} from "../../migrate-plugin/package-manager";
import { RESULT_TYPE, SuccessResult } from "../../result";

vi.mock("consola");

describe("selectPackageManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when packageManager is provided", () => {
    describe.each(PACKAGE_MANGER_VALUES)("provided %s", (packageManager) => {
      it(`should return ${packageManager}`, async () => {
        // WHEN
        const result = await selectPackageManager({ packageManager });

        // THEN
        expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
        expect((result as SuccessResult<PackageManager>).value).toEqual(
          packageManager
        );
        expect((result as SuccessResult<PackageManager>).message).toEqual(
          `Selected package manager: ${packageManager}`
        );
      });
    });

    it("should return error when invalid package manager is provided", async () => {
      // GIVEN
      const invalidPackageManager = "invalid";

      // WHEN
      const result = await selectPackageManager({
        packageManager: invalidPackageManager,
      });

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.ERROR);
      if (result.type === RESULT_TYPE.ERROR) {
        expect(result.message).toEqual(
          `Invalid package manager: ${invalidPackageManager}. Must be one of: ${PACKAGE_MANGER_VALUES.join(
            ", "
          )}`
        );
      }
    });
  });

  describe("when packageManager is not provided", () => {
    describe.each(PACKAGE_MANGER_VALUES)("%s", (packageManager) => {
      it(`should prompt user and return ${packageManager} when selected`, async () => {
        // GIVEN
        vi.mocked(consola.prompt).mockResolvedValue(packageManager);

        // WHEN
        const result = await selectPackageManager({});

        // THEN
        expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
        if (result.type === RESULT_TYPE.SUCCESS) {
          expect(result.value).toEqual(packageManager);
          expect(result.message).toEqual(
            `Selected package manager: ${packageManager}`
          );
        }

        expect(consola.prompt).toHaveBeenCalledWith(
          "Which package manager are you using?",
          {
            type: "select",
            options: [
              { label: PACKAGE_MANGER.NPM, value: PACKAGE_MANGER.NPM },
              { label: PACKAGE_MANGER.YARN, value: PACKAGE_MANGER.YARN },
              { label: PACKAGE_MANGER.PNPM, value: PACKAGE_MANGER.PNPM },
            ],
          }
        );
      })
    });
  });
});
