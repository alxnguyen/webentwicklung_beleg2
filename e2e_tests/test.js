import { Selector } from "testcafe";

fixture`login`.page`https://hungry-tereshkova-7ccef7.netlify.app/`

test("successful login"), async t => {
    await t
        .typeText("#email", "user1@email.com")
        .typeText("#password", "password1")
        .click("");
}