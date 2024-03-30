import streamlit as st
from transformers import BertTokenizer, TFBertForSequenceClassification  # Assuming TensorFlow backend

# Load pre-trained tokenizer and model (replace with your chosen model and weights)
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = TFBertForSequenceClassification.from_pretrained("bert-base-uncased")

def summarize_documents(docs):
  """Summarizes a list of documents using the BERT model."""
  summaries = []
  for doc in docs:
    inputs = tokenizer(doc, return_tensors="tf", padding=True)
    outputs = model(**inputs)
    predictions = outputs.logits.argmax(-1).numpy()[0]  # Extract predicted label
    # Customize summary generation based on predicted label (optional)
    if predictions == 0:  # Example: Label 0 indicates neutral sentiment, generate shorter summary
      summary = tokenizer.decode(inputs["input_ids"][0][: int(len(inputs["input_ids"][0]) * 0.7)], skip_special_tokens=True)
    else:
      summary = tokenizer.decode(inputs["input_ids"][0], skip_special_tokens=True)  # Default summary
    summaries.append(summary)
  return summaries

st.title("Multi-Document Summarization with BERT")
st.write("Upload and summarize multiple documents")

uploaded_files = st.file_uploader("Choose documents (TXT, PDF, etc.)", accept=".txt,.pdf", type="multi")

if uploaded_files:
  documents = []
  for uploaded_file in uploaded_files:
    bytes_data = uploaded_file.read()
    # Preprocess documents based on file type (e.g., convert PDF to text)
    if uploaded_file.type == "text/plain":
      document = bytes_data.decode("utf-8")
    else:
      # Add logic for handling other file types (PDF, etc.) using libraries like PyPDF2
      st.error("Unsupported file format. Please upload TXT or PDF documents.")
      continue
    documents.append(document)

  if documents:
    st.write("**Uploaded Documents:**")
    for i, doc in enumerate(documents):
      st.write(f"- Document {i+1}")
      st.text_area(f"Document {i+1} Content", value=doc, height=100, disabled=True)  # Display content

    summarize_button = st.button("Summarize Documents")

    if summarize_button:
      summaries = summarize_documents(documents)
      st.write("**Document Summaries:**")
      for i, summary in enumerate(summaries):
        st.write(f"- Summary for Document {i+1}")
        st.write(summary)
