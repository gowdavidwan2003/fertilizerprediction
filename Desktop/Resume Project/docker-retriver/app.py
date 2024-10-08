import gradio as gr
from langchain.vectorstores import FAISS
from langchain_community.embeddings import GPT4AllEmbeddings

# Define the path to the saved FAISS index
FAISS_INDEX_PATH = "data/faiss_index.index"

# Initialize the embedding model
embedding_model = GPT4AllEmbeddings()

# Load the FAISS vector store with deserialization enabled
vector_store = FAISS.load_local(
    FAISS_INDEX_PATH,
    embedding_model,
    allow_dangerous_deserialization=True  # Ensure security if possible
)
print(f"FAISS vector store loaded from {FAISS_INDEX_PATH}")

# Initialize the retriever
retriever = vector_store.as_retriever(search_kwargs={"k": 5})
print("Retriever initialized successfully.")

def search_documents(query):
    """
    Takes a user query and returns the top 5 relevant documents.
    """
    results = retriever.get_relevant_documents(query)
    if not results:
        return "No relevant documents found."
    
    # Format the results
    formatted_results = ""
    for idx, doc in enumerate(results, 1):
        formatted_results += f"**Document {idx}:**\n{doc.page_content}\n\n"
    
    return formatted_results

# Define the Gradio interface
iface = gr.Interface(
    fn=search_documents,
    inputs=gr.Textbox(lines=2, placeholder="Enter your query here...", label="Query"),
    outputs=gr.Markdown(label="Search Results"),
    title="FAISS Vector Store Search",
    description="Enter a query to search through the FAISS vector store and retrieve relevant documents."
)

# Launch the Gradio app
if __name__ == "__main__":
    iface.launch()
