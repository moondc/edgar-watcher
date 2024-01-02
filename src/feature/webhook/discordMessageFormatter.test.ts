import { formatUsers, formatMessage, formatUrls, generateMessage } from './discordMessageFormatter';

describe('discordMessageFormatter.formatUsers tests', () => {
    it('should generate a comma separated list of users', () => {
        const input = ["asdf", "qwer"];
        const expected = "@asdf, @qwer";
        const actual = formatUsers(input);
        expect(actual).toBe(expected);
    });

    it('should allow @ to be prefixed', () => {
        const input = ["@asdf", "@qwer"];
        const expected = "@asdf, @qwer";
        const actual = formatUsers(input);
        expect(actual).toBe(expected);
    });

    it('doesn\'t need @ to be prefixed', () => {
        const input = ["asdf", "qwer"];
        const expected = "@asdf, @qwer";
        const actual = formatUsers(input);
        expect(actual).toBe(expected);
    });
});

describe('discordMessageFormatter.formatMessage tests', () => {
    it('should do nothing at the moment', () => {
        const input = "a";
        const expected = "a";
        const actual = formatMessage(input);
        expect(actual).toBe(expected);
    });
});

describe('discordMessageFormatter.formatUrls tests', () => {
    it('should join a list of urls with new lines', () => {
        const input = ["asdf", "qwer"];
        const expected = "asdf\nqwer";
        const actual = formatUrls(input);
        expect(actual).toBe(expected);
    });
});

describe('discordMessageFormatter.generateMessage tests', () => {
    it('should format ', () => {
        const expected = "@a\nb\nc";
        const actual = generateMessage(["a"], "b", ["c"]);
        expect(actual).toBe(expected);
    });
});