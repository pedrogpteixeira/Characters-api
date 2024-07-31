import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Result} from "../../core/logic/Result";
import {QuoteId} from "./quoteId";
import IQuoteDTO from "../../dto/naruto/IQuoteDTO";

interface QuoteProps {
    characterId: string;
    text: string;
    receiver: string;
}

export class Quote extends AggregateRoot<QuoteProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get quoteId(): QuoteId {
        return new QuoteId(this.quoteId.toValue());
    }

    get characterId(): string {
        return this.props.characterId;
    }

    get text(): string {
        return this.props.text;
    }

    get receiver(): string {
        return this.props.receiver;
    }

    private constructor(props: QuoteProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(quoteDTO: IQuoteDTO, id?: UniqueEntityID): Result<Quote> {
        const characterId = quoteDTO.characterId;
        const text = quoteDTO.text;
        const receiver = quoteDTO.receiver;

        if (!!characterId == false || characterId.length == 0) {
            return Result.fail<Quote>("Character ID is required");
        } else if (!!text == false || text.length === 0) {
            return Result.fail<Quote>("Text is required");
        } else if (!!receiver == false || receiver.length === 0) {
            return Result.fail<Quote>("Receiver is required");
        } else {
            const quote = new Quote({
                characterId,
                text,
                receiver
            }, id);
            return Result.ok<Quote>(quote)
        }

    }
}