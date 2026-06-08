import React from "react";
import ReactMarkdown from "react-markdown";

interface EventModalProps {
    descricao?: string;
    onClose: () => void;
}

export default function EventModal({ descricao, onClose }: EventModalProps) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    x
                </button>
                <div className="modal-descricao">
                    <ReactMarkdown>
                        {descricao || "*Sem descrição disponível.*"}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
