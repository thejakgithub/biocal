import React from 'react'
import Image from 'react-bootstrap/Image'

export default function Board() {
    return (
        <div className="d-flex justify-content-center">
            <Image src="/img/board.png"
                alt="board"
                width={850}
             >
            </Image>
        </div>
    )
}