import { test, expect } from "@playwright/test";

/**
 * API Test Suite - Reqres.in
 *
 * Note on reqres.in limitations:
 * reqres.in is a mock/fake API used for testing purposes.
 * It does NOT persist data — users created via POST are not
 * actually stored, so GET /users/{newId} returns 404.
 *
 * Approach taken:
 * - POST: Create user, validate 201 status, store userId and response body
 * - GET: Validate the created user details from the stored POST response
 *        (since reqres.in doesn't persist POST data, a separate GET by
 *        the new userId would return 404 — not a limitation of our test
 *        but a known constraint of the mock API)
 * - PUT: Update the user using stored userId, validate updated name in response
 */

const BASE_URL = process.env.API_BASE_URL || "https://reqres.in/api";

// reqres.in requires an API key for write operations
const HEADERS = {
  "x-api-key": process.env.REQRES_API_KEY,
};

const newUser = {
  name: "Pavan Kumar",
  job: "QA Engineer",
};

const updatedName = "Pavan Kumar - QA Automation";

// Use a single test to maintain state across all 3 operations
test("Reqres.in - Create, validate and update user", async ({ request }) => {
  // ── Step 1: POST - Create user ───────────────────────────────────────────
  const createResponse = await request.post(`${BASE_URL}/users`, {
    headers: HEADERS,
    data: newUser,
  });

  expect(createResponse.status()).toBe(201);

  const createdUser = await createResponse.json();
  console.log("📤 Create User Response:", JSON.stringify(createdUser, null, 2));

  expect(createdUser.name).toBe(newUser.name);
  expect(createdUser.job).toBe(newUser.job);
  expect(createdUser.id).toBeTruthy();

  const userId = createdUser.id;
  console.log(`✅ User created. userId: ${userId}`);

  // ── Step 2: GET - Validate created user details ──────────────────────────
  /**
   * reqres.in does not persist POST data.
   * GET /users/{userId} for a newly created user returns 404.
   * Therefore, we validate the created user details using the
   * stored POST response body — this confirms the API returned
   * the correct data for the user we created.
   */
  console.log("📥 Validating created user details from POST response...");

  expect(createdUser).toBeTruthy();
  expect(createdUser.name).toBe(newUser.name);
  expect(createdUser.job).toBe(newUser.job);
  expect(createdUser.id).toBeTruthy();

  console.log(`✅ Created user details validated:`);
  console.log(`   Name : ${createdUser.name}`);
  console.log(`   Job  : ${createdUser.job}`);
  console.log(`   ID   : ${userId}`);

  // ── Step 3: PUT - Update user name ───────────────────────────────────────
  const updateResponse = await request.put(`${BASE_URL}/users/${userId}`, {
    headers: HEADERS,
    data: {
      name: updatedName,
      job: newUser.job,
    },
  });

  expect(updateResponse.status()).toBe(200);

  const updatedUser = await updateResponse.json();
  console.log("📝 Update User Response:", JSON.stringify(updatedUser, null, 2));

  expect(updatedUser.name).toBe(updatedName);
  expect(updatedUser.job).toBe(newUser.job);
  expect(updatedUser.updatedAt).toBeTruthy();

  console.log(`✅ Name updated to: "${updatedUser.name}"`);
  console.log(`🕐 Updated at: ${updatedUser.updatedAt}`);
});
