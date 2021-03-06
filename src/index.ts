import Browser from './browser';
import { SentenceNode } from "./Nodes/SentenceNode";
import { DOMParser as DP } from 'xmldom';
import makeTerminus from './makeTerminus';
import purgeCommentNodes from './purgeCommentNodes';

export default class PhraseEngine extends Browser {
    public static getDOMParser(): { new(): DP } {
        return DP;
    }

    public static compile(xml: string): PhraseEngine {
        const root = (new (this.getDOMParser())).parseFromString(xml, 'text/xml').documentElement;

        purgeCommentNodes(root);

        return new PhraseEngine(
            new SentenceNode(
                root,
                {
                    ignore_spaces: [false],
                    next_stack: [makeTerminus()],
                    id_map: {},
                    node_count: 0
                }
            )
        );
    }
}