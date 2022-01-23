import { Selector, ClientFunction } from 'testcafe';

fixture`login`.page`https://hungry-tereshkova-7ccef7.netlify.app/`;

const landSelect = Selector("#land_list");
const landOption = landSelect.find("option");

test("successful login", async t => {
    const getLocation = ClientFunction(() => document.location.href);
    await t
        .typeText("#email", "user1@email.com")
        .typeText("#password", "password1")
        .click("#login_btn")
        .expect(getLocation()).contains("https://hungry-tereshkova-7ccef7.netlify.app/map.html");
});

test("unsuccessful login#1", async t => {
    const getLocation = ClientFunction(() => document.location.href);
    await t
        .typeText("#email", "kevin@email.com")
        .typeText("#password", "password1")
        .click("#login_btn")
        .expect(Selector("#warning").innerText).eql("Login fehlgeschlagen.");
});

test("unsuccessful login#2", async t => {
    const getLocation = ClientFunction(() => document.location.href);
    await t
        .typeText("#email", "kevin@email.com")
        .click("#login_btn")
        .expect(Selector("#warning").innerText).eql("Login fehlgeschlagen.");
});

test("unsuccessful login#3", async t => {
    const getLocation = ClientFunction(() => document.location.href);
    await t
        .typeText("#email", "user1@email.com")
        .typeText("#password", "asdf")
        .click("#login_btn")
        .expect(Selector("#warning").innerText).eql("Login fehlgeschlagen.");
});

test("unsuccessful login#4", async t => {
    const getLocation = ClientFunction(() => document.location.href);
    await t
        .click("#login_btn")
        .expect(Selector("#warning").innerText).eql("Login fehlgeschlagen.");
});

test("successful add", async t => {
    await t
        .typeText("#email", "user2@email.com")
        .typeText("#password", "password2")
        .click("#login_btn")
        .click("edittrip")
        .typeText("#tripname", "Reise A")
        .click(landSelect)
        .click(landOption.withText("Deutschland"))
        .typeText("#start", "2022-01-24")
        .typeText("#ende", "2022-01-26")
        .click("#create_btn")
        .expect(Selector("#1_0").innerText).eql("Reise A")
        .expect(Selector("#1_1").innerText).eql("DE")
        .expect(Selector("#1_2").innerText).eql("24.01.2022")
        .expect(Selector("#1_3").innerText).eql("26.01.2022")
        .click("#button_del1");
});